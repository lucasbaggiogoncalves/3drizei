# 3drizei · Roadmap da Loja (front)

Documento de planejamento para a **loja pública** (`(loja)`), a segunda etapa do
projeto. O backoffice (`/admin`) está finalizado e é a fonte da verdade de catálogo,
pedidos, clientes, despesas e precificação. Este doc descreve visão, decisões,
mudanças de schema, fases de construção e diretrizes de design/segurança.

> Status: planejamento. Nada da loja foi construído ainda — o `/` hoje redireciona
> para `/admin`.

---

## 1. Visão

Loja de itens de impressão 3D **sob encomenda** e **personalizados**. O cliente
navega por um catálogo enxuto, personaliza o item (texto, opções, fotos de
referência), paga online e acompanha o pedido. Há também uma frente de
**"crio do zero / sob demanda"**, captada como orçamento.

Canal real de fechamento provavelmente continua sendo o WhatsApp — a loja
**reduz fricção** (catálogo, preço, pagamento, acompanhamento) sem substituir o
contato humano.

---

## 2. Decisões confirmadas

| Tema | Decisão | Implicação |
| --- | --- | --- |
| **Identificação** | Navegar e montar carrinho **sem login**; trava só no checkout (ao "Finalizar compra") | Carrinho anônimo (localStorage) que sobrevive ao login; `clientes.user_id` vira o elo; RLS por cliente |
| **Pagamento** | Mercado Pago **checkout transparente (Bricks)** | Cartão tokenizado no browser (não passa pelo nosso servidor); PIX/boleto inline; mais UI, mais controle |
| **Entrada do pedido** | Vira pedido (status **Aprovado**) **só após pagamento aprovado** | Antes disso é só `pagamentos.status = pendente`; nada polui o kanban |
| **Sob demanda** | Formulário de **orçamento/lead** (descrição + fotos) | Nova tabela `orcamentos`; gestão no backoffice |
| **Frete** | **Melhor Envio** (cotação por CEP + etiqueta) | Endereço de origem, peso/dimensões por variação (já existem), `frete_centavos` no pedido |
| **Catálogo** | Enxuto (1–5 produtos) no lançamento | Dá pra priorizar página de produto bem-feita sobre filtros/busca complexos |

**Trava de login só no checkout (gated auth):** o visitante navega e monta o
carrinho anonimamente; o login/cadastro só é exigido ao clicar em **"Finalizar
compra"**, com retorno ao checkout depois. Isso reduz drasticamente o abandono.
Como o carrinho é client-side (localStorage), ele **sobrevive ao login** sem
necessidade de merge no servidor. Mitigações extras: **login social (Google)** além
de e-mail/senha e pedir o mínimo no cadastro (nome, e-mail, senha) — CPF e endereço
só no checkout.

**Fluxo:** `navegar (anônimo) → personalizar → adicionar ao carrinho (anônimo) →
"Finalizar compra" → [trava] login/cadastro → checkout (endereço, frete, pagamento)`.

---

## 3. O que já existe e será reaproveitado

Do backoffice/Supabase, já prontos:

- **`produtos`**: `slug`, `fotos[]`, `descricao`, `lead_time_dias`,
  `personalizacao_schema` (campos que o cliente preenche), `ativo` (visível na loja),
  `disponivel_pedidos` (uso interno). A loja lista `where ativo = true`.
- **`produto_variacoes`**: `preco_venda_centavos`, `peso_g`, `dim_x/y/z_mm`,
  `controla_estoque`, `estoque`, `opcoes`, `ativo`. Peso e dimensões já permitem
  cotar frete.
- **`clientes`**: `user_id` (FK para `auth.users`), `nome`, `email`, `telefone`,
  `cpf_cnpj`, `endereco` (jsonb). Será o registro do cliente da loja.
- **`pedidos` / `pedido_itens`**: mesma estrutura usada pelo admin, com snapshot de
  preço/custo/personalização. Pedido da loja entra como `aprovado`.
- **`pagamentos`**: `status` (`pendente`/`pago`/`estornado`/`falhou`), `provider`,
  `provider_id`, `raw`, `pago_em`. Estrutura pronta para o webhook do MP.
- **Storage**: bucket `produtos` (leitura pública) e `referencias` (privado, hoje
  só admin). Imagens de produto já servem direto.
- **Motor de precificação** (`lib/pricing/engine.ts`): fonte única; o checkout
  **revalida preço no servidor** a partir da variação (nunca confia no cliente).
- **Design system**: tokens de cor (terracota/cobre/clay), fontes (Fredoka /
  Nunito Sans / Space Mono), sombras quentes, e os componentes `components/ui/`.

---

## 4. Mudanças de schema/segurança necessárias

A loja muda o modelo de acesso: hoje **tudo é admin-only** (`private.is_admin()`).
Precisamos abrir leitura pública do catálogo e acesso do cliente aos próprios dados.

### 4.1 RLS — leitura pública do catálogo
- `produtos`: `select` para `anon`/`authenticated` quando `ativo = true`.
- `produto_variacoes`: `select` público quando `ativo = true` e o produto pai está
  ativo. **Atenção:** não expor `breakdown` (custo) — criar uma *view* pública
  (`loja_variacoes`) ou política por coluna que exponha só preço/peso/dimensões/opções.

### 4.2 Cliente (role `customer`)
- Garantir trigger `handle_new_user` criando `profiles` com role `customer` no signup
  (verificar se já existe; o admin usa role `admin`).
- Vincular/auto-criar `clientes` ao primeiro checkout, com `user_id = auth.uid()`.
- RLS adicionais (sem remover as policies de admin):
  - `clientes`: cliente lê/edita **a própria** linha (`user_id = auth.uid()`).
  - `pedidos` / `pedido_itens` / `pagamentos`: cliente lê os **próprios** registros
    (join por `cliente_id` → `clientes.user_id = auth.uid()`).

### 4.3 Upload de referências pelo cliente
- Política no bucket `referencias` permitindo `authenticated` **inserir** em uma pasta
  própria (ex.: prefixo `clientes/{auth.uid()}/...`), sem leitura cruzada.
- Alternativa mais simples: novo bucket `referencias-loja` com regra por prefixo.

### 4.4 Frete no pedido
- Adicionar a `pedidos`: `frete_centavos` (int, default 0) e
  `endereco_entrega` (jsonb snapshot). Ajustar exibição de total (itens + frete − desconto).
- Config de **endereço de origem** e dimensões de embalagem (tabela `loja_config`
  ou reuso de `pricing_settings`/uma tabela de settings dedicada).

### 4.5 Orçamentos (sob demanda)
- Nova tabela `orcamentos`: `nome`, `contato`, `descricao`, `referencias[]`
  (paths no storage), `status` (`novo`/`respondido`/`convertido`/`arquivado`),
  `cliente_id` (opcional), timestamps. RLS: insert público (ou autenticado), gestão admin.

### 4.6 Pagamento (transparente)
- Tabela `pagamentos` já serve. Acrescentar, se necessário, `metodo`
  (`pix`/`cartao`/`boleto`) e `parcelas`.
- **Idempotência**: usar `provider_id` único + tratar reentrega de webhook.

---

## 5. Arquitetura

- **Route group `(loja)`** dentro de `app/`, com layout/tema próprios (header,
  carrinho, footer), separado do `(dashboard)` do admin. Mudar o `/` para a home
  da loja (hoje redireciona para `/admin`).
- **Carrinho client-side** (Zustand + `localStorage`), pois itens são personalizados.
  O servidor **revalida tudo** no checkout (preço, disponibilidade, estoque).
- **Server Actions / Route Handlers** para checkout, criação de pagamento e webhook.
  Segredos (MP access token, Melhor Envio token) **nunca** no client — em env server
  ou Edge Functions do Supabase.
- **Autoridade de preço no servidor**: o checkout recalcula a partir de
  `produto_variacoes` e congela snapshot em `pedido_itens` (mesmo padrão do admin).
- **Pedido criado só no webhook `pago`**: o fluxo cria primeiro um registro de
  intenção/pagamento; ao confirmar, materializa o `pedido` (status `aprovado`) +
  `pedido_itens` + `pagamentos.pago`. Garante kanban limpo.

---

## 6. Fases de construção

Cada fase é entregável e testável de forma independente.

### Fase 0 — Fundações da loja
- Route group `(loja)`, layout (header com logo, navegação, ícone de carrinho), footer.
- Tema/estilos reaproveitando tokens do design system; mobile-first.
- Home inicial (hero + destaque de produtos + seção "sob demanda" + sobre).
- RLS de **leitura pública** do catálogo (4.1) + view pública sem custo.
- **Entregável:** home navegável consumindo produtos reais (sem checkout).

### Fase 1 — Catálogo e página de produto
- Listagem de produtos ativos (grid), com faixa de preço por variação.
- Página de produto (`/produto/[slug]`): galeria de fotos, descrição, seletor de
  variação, **formulário de personalização** dirigido por `personalizacao_schema`
  (texto/número/data/seleção/foto), prazo de produção (`lead_time_dias`).
- Preview de preço da variação selecionada.
- **Entregável:** vitrine completa, "adicionar ao carrinho" populando o carrinho local.

### Fase 2 — Contas de cliente
- Signup/login (e-mail/senha + Google), recuperação de senha (Supabase Auth).
- Trigger de `profiles` (role `customer`) e RLS de cliente (4.2).
- Página "Minha conta" (dados básicos, endereços).
- **Trava (gated auth) só na entrada do checkout** — navegação e carrinho seguem
  anônimos; ao "Finalizar compra", exige login/cadastro e retorna ao checkout.
- **Entregável:** login exigido apenas no passo de checkout, com retorno e carrinho
  preservado.

### Fase 3 — Carrinho e checkout (sem pagamento ainda)
- Página de carrinho **anônima** (itens personalizados, quantidades, remover),
  persistida em localStorage e preservada após o login.
- Trava de login entre o carrinho e o checkout (ver Fase 2).
- Checkout: endereço de entrega, revisão, **revalidação server-side** de preço e
  disponibilidade; criação do snapshot de intenção.
- **Entregável:** fluxo até "ir para pagamento" com totais corretos e validados.

> Nota de sequência: o carrinho (estado + UI) pode ser adiantado para a Fase 1
> (já que é anônimo e independe de contas); a Fase 2 só acrescenta a trava na
> transição carrinho → checkout.

### Fase 4 — Frete (Melhor Envio)
- Cotação por CEP (peso/dimensões agregados do carrinho) na etapa de entrega.
- Persistir `frete_centavos` + `endereco_entrega`; refletir no total.
- Config de origem/embalagem.
- **Entregável:** frete real somado ao pedido antes do pagamento.

### Fase 5 — Pagamento (MP transparente / Bricks)
- Integração do **Payment Brick** (cartão tokenizado no browser; PIX com QR; boleto).
- Route Handler server: cria pagamento no MP com o token, valor **autoritativo** do
  servidor; **webhook** atualiza `pagamentos` e, ao aprovar, **materializa o pedido**
  (status `aprovado`) com snapshot dos itens.
- Idempotência e validação de assinatura do webhook.
- **Entregável:** compra ponta a ponta; pedido aparece no kanban do admin.

### Fase 6 — Pós-compra
- Página "Meus pedidos" (cliente vê status, itens, valores).
- E-mails transacionais (Resend): confirmação de pagamento, mudança de status.
- **Entregável:** cliente acompanha o pedido; e-mails automáticos.

### Fase 7 — Sob demanda (orçamento)
- Formulário público de orçamento (descrição + upload de referências).
- Tabela `orcamentos` + tela de gestão no backoffice (responder/converter em pedido).
- **Entregável:** captação de demanda personalizada com gestão interna.

### Fase 8 — Envio e rastreio (liga com o roadmap do backoffice)
- Geração de **etiqueta** (Melhor Envio) a partir do pedido pago.
- Novos status `enviado` / `entregue` (atualização por rastreio) — alinhar com o
  enum `pedido_status` atual (`aprovado`/`modelagem`/`em_fabricacao`/`concluido`).
- **Entregável:** logística fechada; cliente vê rastreio.

### Acabamento (contínuo)
- SEO (metadata, sitemap, OpenGraph), performance (next/image, cache de catálogo),
  analytics, acessibilidade, política de trocas/LGPD.

---

## 7. Diretrizes de design / UX

- **Marca:** terracota/cobre/clay, fontes Fredoka (títulos) / Nunito Sans (texto) /
  Space Mono (números/preços), sombras quentes. Tom afetivo e artesanal.
- **Mobile-first:** maioria do tráfego virá de redes sociais/WhatsApp no celular.
- **Foco no produto personalizado:** a página de produto é o coração — preview claro
  da personalização, expectativa de prazo e o que será produzido.
- **Confiança:** fotos reais, prazo de produção visível, formas de pagamento e
  selo de segurança, contato fácil (WhatsApp flutuante).
- **Reuso de componentes:** `components/ui/` é compartilhado; criar
  `components/loja/` para componentes específicos (não misturar com `components/admin/`).
- **Imagens:** `next/image` + URLs públicas do bucket `produtos`.

---

## 8. Segurança e regras de ouro

- **Nunca confiar em valores do cliente** (preço, total, frete) — recalcular no servidor.
- **Segredos só no servidor** (MP access token, Melhor Envio token, Resend) — em env
  server ou Edge Functions; o client usa apenas a **public key** do MP.
- **Cartão não toca nosso servidor** (tokenização via SDK do MP — checkout transparente).
- **Webhook**: validar assinatura, tratar idempotência (reentrega), nunca materializar
  pedido sem `status = pago` confirmado pelo provedor.
- **RLS por cliente**: garantir que um cliente só enxergue os próprios pedidos/pagamentos.
- **LGPD**: CPF e endereço são dados pessoais — coletar o mínimo, no momento certo
  (checkout), com base legal clara.

---

## 9. Variáveis de ambiente previstas

```bash
# Mercado Pago
NEXT_PUBLIC_MP_PUBLIC_KEY=...      # client (Bricks)
MP_ACCESS_TOKEN=...                # server
MP_WEBHOOK_SECRET=...              # validação do webhook

# Melhor Envio
MELHOR_ENVIO_TOKEN=...
MELHOR_ENVIO_SANDBOX=true

# E-mail
RESEND_API_KEY=...

# Loja
LOJA_ORIGEM_CEP=...                # origem para cotação de frete
```

---

## 10. Em aberto / parking lot (decidir nas fases)

- **Estoque:** `controla_estoque`/`estoque` já existem — usar para produtos prontos
  futuros? No MVP (sob encomenda) provavelmente ignorado.
- **Cupons/descontos na loja** (o pedido já tem `desconto_centavos`).
- **Parcelamento no cartão** (definir nº de parcelas e quem paga juros).
- **Quantidade de itens personalizados** (cada personalização é única — limitar a 1?).
- **Política de prazo** exibida (lead time + frete) e SLA de resposta de orçamento.
- **Multi-fotos de referência por item** e limites de upload.

---

## 11. Próximo passo sugerido

Começar pela **Fase 0** (fundações + RLS pública de catálogo + home), porque
desbloqueia visualmente o projeto e valida o acesso público ao catálogo sem risco
de expor custo. Em seguida, Fase 1 (página de produto), que é o maior gerador de valor.
