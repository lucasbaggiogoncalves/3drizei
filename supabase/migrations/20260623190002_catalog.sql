-- 3drizei · catalogo: materiais, pricing_settings, produtos, variacoes
-- Produto-pai + variacoes (preco/peso/calculo por variacao).

-- ============================================================
-- materiais
-- ============================================================
create table public.materiais (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  custo_por_kg_centavos integer not null default 0 check (custo_por_kg_centavos >= 0),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_materiais_updated_at
before update on public.materiais
for each row execute function public.set_updated_at();

alter table public.materiais enable row level security;

create policy "materiais_admin_all" on public.materiais
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- ============================================================
-- pricing_settings (versionado — pedidos antigos referenciam a versao)
-- ============================================================
create table public.pricing_settings (
  id uuid primary key default gen_random_uuid(),
  versao integer not null,
  hora_maquina_centavos integer not null default 0 check (hora_maquina_centavos >= 0),
  kwh_centavos integer not null default 95 check (kwh_centavos >= 0),
  consumo_w integer not null default 150 check (consumo_w >= 0),
  buffer_falha_pct numeric(5, 2) not null default 10 check (buffer_falha_pct >= 0),
  mao_obra_hora_centavos integer not null default 2000 check (mao_obra_hora_centavos >= 0),
  margem_pct numeric(5, 2) not null default 60 check (margem_pct >= 0),
  taxas_pct numeric(5, 2) not null default 5 check (taxas_pct >= 0),
  embalagem_padrao_centavos integer not null default 0 check (embalagem_padrao_centavos >= 0),
  vigente boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index uq_pricing_settings_versao on public.pricing_settings (versao);
create unique index uq_pricing_settings_vigente on public.pricing_settings (vigente) where vigente;

create trigger trg_pricing_settings_updated_at
before update on public.pricing_settings
for each row execute function public.set_updated_at();

alter table public.pricing_settings enable row level security;

create policy "pricing_settings_admin_all" on public.pricing_settings
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- ============================================================
-- produtos (pai)
-- ============================================================
create table public.produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  descricao text,
  fotos text[] not null default '{}',
  lead_time_dias integer not null default 7 check (lead_time_dias >= 0),
  personalizacao_schema jsonb not null default '[]'::jsonb,
  campos_internos jsonb not null default '{}'::jsonb,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_produtos_ativo on public.produtos (ativo);

create trigger trg_produtos_updated_at
before update on public.produtos
for each row execute function public.set_updated_at();

alter table public.produtos enable row level security;

create policy "produtos_admin_all" on public.produtos
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- Loja (fase 2): leitura publica de produtos ativos
create policy "produtos_public_select" on public.produtos
for select to anon, authenticated
using (ativo = true);

-- ============================================================
-- produto_variacoes (o que de fato se vende/calcula/envia)
-- ============================================================
create table public.produto_variacoes (
  id uuid primary key default gen_random_uuid(),
  produto_id uuid not null references public.produtos (id) on delete cascade,
  nome text,
  opcoes jsonb not null default '{}'::jsonb,
  material_id uuid references public.materiais (id) on delete set null,
  gramas numeric(10, 2) not null default 0 check (gramas >= 0),
  tempo_impressao_h numeric(10, 2) not null default 0 check (tempo_impressao_h >= 0),
  tempo_pos_h numeric(10, 2) not null default 0 check (tempo_pos_h >= 0),
  peso_g numeric(10, 2) not null default 0 check (peso_g >= 0),
  dim_x_mm numeric(10, 2),
  dim_y_mm numeric(10, 2),
  dim_z_mm numeric(10, 2),
  consumiveis_centavos integer not null default 0 check (consumiveis_centavos >= 0),
  embalagem_centavos integer not null default 0 check (embalagem_centavos >= 0),
  preco_venda_centavos integer not null default 0 check (preco_venda_centavos >= 0),
  breakdown jsonb not null default '{}'::jsonb,
  pricing_settings_versao integer,
  controla_estoque boolean not null default false,
  estoque integer check (estoque is null or estoque >= 0),
  sku text,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_variacoes_produto on public.produto_variacoes (produto_id);
create index idx_variacoes_ativo on public.produto_variacoes (ativo);

create trigger trg_variacoes_updated_at
before update on public.produto_variacoes
for each row execute function public.set_updated_at();

alter table public.produto_variacoes enable row level security;

create policy "variacoes_admin_all" on public.produto_variacoes
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

create policy "variacoes_public_select" on public.produto_variacoes
for select to anon, authenticated
using (ativo = true);
