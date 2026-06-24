export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      anexos: {
        Row: {
          bucket: string
          cliente_id: string | null
          created_at: string
          id: string
          nome: string | null
          pedido_id: string | null
          storage_path: string
          tipo: string | null
        }
        Insert: {
          bucket?: string
          cliente_id?: string | null
          created_at?: string
          id?: string
          nome?: string | null
          pedido_id?: string | null
          storage_path: string
          tipo?: string | null
        }
        Update: {
          bucket?: string
          cliente_id?: string | null
          created_at?: string
          id?: string
          nome?: string | null
          pedido_id?: string | null
          storage_path?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anexos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anexos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          cpf_cnpj: string | null
          created_at: string
          email: string | null
          endereco: Json | null
          id: string
          nome: string
          notas: string | null
          telefone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: Json | null
          id?: string
          nome: string
          notas?: string | null
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: Json | null
          id?: string
          nome?: string
          notas?: string | null
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      despesas: {
        Row: {
          categoria: string
          created_at: string
          data: string
          descricao: string | null
          id: string
          pedido_id: string | null
          tipo: string
          updated_at: string
          valor_centavos: number
        }
        Insert: {
          categoria: string
          created_at?: string
          data?: string
          descricao?: string | null
          id?: string
          pedido_id?: string | null
          tipo: string
          updated_at?: string
          valor_centavos: number
        }
        Update: {
          categoria?: string
          created_at?: string
          data?: string
          descricao?: string | null
          id?: string
          pedido_id?: string | null
          tipo?: string
          updated_at?: string
          valor_centavos?: number
        }
        Relationships: [
          {
            foreignKeyName: "despesas_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      materiais: {
        Row: {
          ativo: boolean
          created_at: string
          custo_por_kg_centavos: number
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          custo_por_kg_centavos?: number
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          custo_por_kg_centavos?: number
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      pagamentos: {
        Row: {
          created_at: string
          id: string
          pago_em: string | null
          pedido_id: string
          provider: string
          provider_id: string | null
          raw: Json | null
          status: string
          updated_at: string
          valor_centavos: number
        }
        Insert: {
          created_at?: string
          id?: string
          pago_em?: string | null
          pedido_id: string
          provider?: string
          provider_id?: string | null
          raw?: Json | null
          status?: string
          updated_at?: string
          valor_centavos: number
        }
        Update: {
          created_at?: string
          id?: string
          pago_em?: string | null
          pedido_id?: string
          provider?: string
          provider_id?: string | null
          raw?: Json | null
          status?: string
          updated_at?: string
          valor_centavos?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido_itens: {
        Row: {
          breakdown_snapshot: Json
          created_at: string
          custo_unit_centavos: number
          descricao: string
          id: string
          pedido_id: string
          personalizacao_respostas: Json
          preco_unit_centavos: number
          produto_id: string | null
          quantidade: number
          variacao_id: string | null
        }
        Insert: {
          breakdown_snapshot?: Json
          created_at?: string
          custo_unit_centavos?: number
          descricao: string
          id?: string
          pedido_id: string
          personalizacao_respostas?: Json
          preco_unit_centavos?: number
          produto_id?: string | null
          quantidade?: number
          variacao_id?: string | null
        }
        Update: {
          breakdown_snapshot?: Json
          created_at?: string
          custo_unit_centavos?: number
          descricao?: string
          id?: string
          pedido_id?: string
          personalizacao_respostas?: Json
          preco_unit_centavos?: number
          produto_id?: string | null
          quantidade?: number
          variacao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedido_itens_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_itens_variacao_id_fkey"
            columns: ["variacao_id"]
            isOneToOne: false
            referencedRelation: "produto_variacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          cliente_id: string | null
          created_at: string
          custo_total_centavos: number
          id: string
          lucro_centavos: number | null
          numero: number
          observacoes: string | null
          ordem: number
          status: Database["public"]["Enums"]["pedido_status"]
          total_centavos: number
          updated_at: string
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          custo_total_centavos?: number
          id?: string
          lucro_centavos?: number | null
          numero?: number
          observacoes?: string | null
          ordem?: number
          status?: Database["public"]["Enums"]["pedido_status"]
          total_centavos?: number
          updated_at?: string
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          custo_total_centavos?: number
          id?: string
          lucro_centavos?: number | null
          numero?: number
          observacoes?: string | null
          ordem?: number
          status?: Database["public"]["Enums"]["pedido_status"]
          total_centavos?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_settings: {
        Row: {
          buffer_falha_pct: number
          consumo_w: number
          created_at: string
          embalagem_padrao_centavos: number
          hora_maquina_centavos: number
          id: string
          kwh_centavos: number
          mao_obra_hora_centavos: number
          margem_pct: number
          taxas_pct: number
          updated_at: string
          versao: number
          vigente: boolean
        }
        Insert: {
          buffer_falha_pct?: number
          consumo_w?: number
          created_at?: string
          embalagem_padrao_centavos?: number
          hora_maquina_centavos?: number
          id?: string
          kwh_centavos?: number
          mao_obra_hora_centavos?: number
          margem_pct?: number
          taxas_pct?: number
          updated_at?: string
          versao: number
          vigente?: boolean
        }
        Update: {
          buffer_falha_pct?: number
          consumo_w?: number
          created_at?: string
          embalagem_padrao_centavos?: number
          hora_maquina_centavos?: number
          id?: string
          kwh_centavos?: number
          mao_obra_hora_centavos?: number
          margem_pct?: number
          taxas_pct?: number
          updated_at?: string
          versao?: number
          vigente?: boolean
        }
        Relationships: []
      }
      produto_variacoes: {
        Row: {
          ativo: boolean
          breakdown: Json
          consumiveis_centavos: number
          controla_estoque: boolean
          created_at: string
          dim_x_mm: number | null
          dim_y_mm: number | null
          dim_z_mm: number | null
          embalagem_centavos: number
          estoque: number | null
          gramas: number
          id: string
          material_id: string | null
          nome: string | null
          opcoes: Json
          peso_g: number
          preco_venda_centavos: number
          pricing_settings_versao: number | null
          produto_id: string
          sku: string | null
          tempo_impressao_h: number
          tempo_pos_h: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          breakdown?: Json
          consumiveis_centavos?: number
          controla_estoque?: boolean
          created_at?: string
          dim_x_mm?: number | null
          dim_y_mm?: number | null
          dim_z_mm?: number | null
          embalagem_centavos?: number
          estoque?: number | null
          gramas?: number
          id?: string
          material_id?: string | null
          nome?: string | null
          opcoes?: Json
          peso_g?: number
          preco_venda_centavos?: number
          pricing_settings_versao?: number | null
          produto_id: string
          sku?: string | null
          tempo_impressao_h?: number
          tempo_pos_h?: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          breakdown?: Json
          consumiveis_centavos?: number
          controla_estoque?: boolean
          created_at?: string
          dim_x_mm?: number | null
          dim_y_mm?: number | null
          dim_z_mm?: number | null
          embalagem_centavos?: number
          estoque?: number | null
          gramas?: number
          id?: string
          material_id?: string | null
          nome?: string | null
          opcoes?: Json
          peso_g?: number
          preco_venda_centavos?: number
          pricing_settings_versao?: number | null
          produto_id?: string
          sku?: string | null
          tempo_impressao_h?: number
          tempo_pos_h?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produto_variacoes_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produto_variacoes_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          ativo: boolean
          campos_internos: Json
          created_at: string
          descricao: string | null
          fotos: string[]
          id: string
          lead_time_dias: number
          nome: string
          personalizacao_schema: Json
          slug: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          campos_internos?: Json
          created_at?: string
          descricao?: string | null
          fotos?: string[]
          id?: string
          lead_time_dias?: number
          nome: string
          personalizacao_schema?: Json
          slug: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          campos_internos?: Json
          created_at?: string
          descricao?: string | null
          fotos?: string[]
          id?: string
          lead_time_dias?: number
          nome?: string
          personalizacao_schema?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          nome: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          nome?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pedido_status: "aprovado" | "modelagem" | "em_fabricacao"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pedido_status: ["aprovado", "modelagem", "em_fabricacao"],
    },
  },
} as const
