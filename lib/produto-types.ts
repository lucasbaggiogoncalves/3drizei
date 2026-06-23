export type PersonalizacaoTipo = "texto" | "numero" | "data" | "selecao" | "foto";

export const PERSONALIZACAO_TIPOS: { value: PersonalizacaoTipo; label: string }[] = [
  { value: "texto", label: "Texto" },
  { value: "numero", label: "Número" },
  { value: "data", label: "Data" },
  { value: "selecao", label: "Seleção" },
  { value: "foto", label: "Foto (referência)" },
];

export type PersonalizacaoField = {
  id: string;
  label: string;
  tipo: PersonalizacaoTipo;
  obrigatorio: boolean;
  opcoes?: string[];
};

export type VariacaoInput = {
  id?: string;
  nome: string;
  opcoes: Record<string, string>;
  materialId: string | null;
  gramas: number;
  tempoImpressaoH: number;
  tempoPosH: number;
  pesoG: number;
  dimX: number | null;
  dimY: number | null;
  dimZ: number | null;
  consumiveisCentavos: number;
  embalagemCentavos: number;
  precoVendaCentavos: number;
  controlaEstoque: boolean;
  estoque: number | null;
  sku: string;
  ativo: boolean;
};

export type ProdutoPayload = {
  id?: string;
  nome: string;
  slug: string;
  descricao: string;
  leadTimeDias: number;
  ativo: boolean;
  fotos: string[];
  personalizacao: PersonalizacaoField[];
  variacoes: VariacaoInput[];
};
