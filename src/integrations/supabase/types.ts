export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          created_at: string | null
          data_hora: string
          event_id: string | null
          id: string
          nome: string | null
          numero_whatsapp: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          data_hora: string
          event_id?: string | null
          id?: string
          nome?: string | null
          numero_whatsapp: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          data_hora?: string
          event_id?: string | null
          id?: string
          nome?: string | null
          numero_whatsapp?: string
          status?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          session_id: string | null
          type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          session_id?: string | null
          type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          session_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cpf_cnpj: string | null
          data_cadastro: string | null
          data_nascimento: string | null
          email: string | null
          endereco_complemento: string | null
          endereco_numero: string | null
          endereco_rua: string | null
          estado: string | null
          genero: string | null
          id: number
          nome_completo: string
          pais: string | null
          status: string | null
          telefone: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf_cnpj?: string | null
          data_cadastro?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco_complemento?: string | null
          endereco_numero?: string | null
          endereco_rua?: string | null
          estado?: string | null
          genero?: string | null
          id?: number
          nome_completo: string
          pais?: string | null
          status?: string | null
          telefone?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf_cnpj?: string | null
          data_cadastro?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco_complemento?: string | null
          endereco_numero?: string | null
          endereco_rua?: string | null
          estado?: string | null
          genero?: string | null
          id?: number
          nome_completo?: string
          pais?: string | null
          status?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      consultas_fruit: {
        Row: {
          categoria: string | null
          confianca: string | null
          cor_predominante: string | null
          created_at: string | null
          estado: string | null
          id: number
          nome_cientifico: string | null
          nome_fruta: string | null
          observacoes: string | null
          resposta_enviada: string | null
          resultado_json: Json | null
          status: string | null
          tipo_consulta: string
          updated_at: string | null
          usuario_telefone: string | null
          variedade: string | null
        }
        Insert: {
          categoria?: string | null
          confianca?: string | null
          cor_predominante?: string | null
          created_at?: string | null
          estado?: string | null
          id?: number
          nome_cientifico?: string | null
          nome_fruta?: string | null
          observacoes?: string | null
          resposta_enviada?: string | null
          resultado_json?: Json | null
          status?: string | null
          tipo_consulta: string
          updated_at?: string | null
          usuario_telefone?: string | null
          variedade?: string | null
        }
        Update: {
          categoria?: string | null
          confianca?: string | null
          cor_predominante?: string | null
          created_at?: string | null
          estado?: string | null
          id?: number
          nome_cientifico?: string | null
          nome_fruta?: string | null
          observacoes?: string | null
          resposta_enviada?: string | null
          resultado_json?: Json | null
          status?: string | null
          tipo_consulta?: string
          updated_at?: string | null
          usuario_telefone?: string | null
          variedade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultas_fruit_usuario_telefone_fkey"
            columns: ["usuario_telefone"]
            isOneToOne: false
            referencedRelation: "usuarios_fruit"
            referencedColumns: ["telefone"]
          },
        ]
      }
      dados_cliente: {
        Row: {
          atendimento_humano_ativo: boolean | null
          closer_responsavel: string | null
          consultas_realizadas: number | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          id: number
          name: string | null
          sessionid: string | null
          status: string | null
          status_lead: string | null
          telefone: string | null
        }
        Insert: {
          atendimento_humano_ativo?: boolean | null
          closer_responsavel?: string | null
          consultas_realizadas?: number | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          id?: number
          name?: string | null
          sessionid?: string | null
          status?: string | null
          status_lead?: string | null
          telefone?: string | null
        }
        Update: {
          atendimento_humano_ativo?: boolean | null
          closer_responsavel?: string | null
          consultas_realizadas?: number | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          id?: number
          name?: string | null
          sessionid?: string | null
          status?: string | null
          status_lead?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      daily_message_counter: {
        Row: {
          created_at: string | null
          current_day: number
          id: number
          last_execution: string | null
          updated_at: string | null
          workflow_id: string
        }
        Insert: {
          created_at?: string | null
          current_day?: number
          id?: number
          last_execution?: string | null
          updated_at?: string | null
          workflow_id: string
        }
        Update: {
          created_at?: string | null
          current_day?: number
          id?: number
          last_execution?: string | null
          updated_at?: string | null
          workflow_id?: string
        }
        Relationships: []
      }
      documentos: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      itens_venda: {
        Row: {
          id: number
          preco_unitario: number
          produto_id: number
          quantidade: number
          valor_total: number | null
          venda_id: number
        }
        Insert: {
          id?: number
          preco_unitario: number
          produto_id: number
          quantidade: number
          valor_total?: number | null
          venda_id: number
        }
        Update: {
          id?: number
          preco_unitario?: number
          produto_id?: number
          quantidade?: number
          valor_total?: number | null
          venda_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_venda_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_venda_venda_id_fkey"
            columns: ["venda_id"]
            isOneToOne: false
            referencedRelation: "vendas"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          criado_em: string | null
          detalhes: Json | null
          evento: string | null
          id: string
          numero_whatsapp: string | null
        }
        Insert: {
          criado_em?: string | null
          detalhes?: Json | null
          evento?: string | null
          id?: string
          numero_whatsapp?: string | null
        }
        Update: {
          criado_em?: string | null
          detalhes?: Json | null
          evento?: string | null
          id?: string
          numero_whatsapp?: string | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      produtos: {
        Row: {
          altura: number | null
          ativo: boolean | null
          categoria: string | null
          descricao: string | null
          estoque: number | null
          id: number
          imagem_url: string | null
          largura: number | null
          nome: string
          peso: number | null
          preco: number
          preco_promocional: number | null
          profundidade: number | null
          sku: string | null
          unidade_medida: string | null
        }
        Insert: {
          altura?: number | null
          ativo?: boolean | null
          categoria?: string | null
          descricao?: string | null
          estoque?: number | null
          id?: number
          imagem_url?: string | null
          largura?: number | null
          nome: string
          peso?: number | null
          preco: number
          preco_promocional?: number | null
          profundidade?: number | null
          sku?: string | null
          unidade_medida?: string | null
        }
        Update: {
          altura?: number | null
          ativo?: boolean | null
          categoria?: string | null
          descricao?: string | null
          estoque?: number | null
          id?: number
          imagem_url?: string | null
          largura?: number | null
          nome?: string
          peso?: number | null
          preco?: number
          preco_promocional?: number | null
          profundidade?: number | null
          sku?: string | null
          unidade_medida?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string | null
          nivel: string | null
          nome: string | null
          numero_whatsapp: string
          recebeu_link_grupo: boolean | null
        }
        Insert: {
          created_at?: string | null
          nivel?: string | null
          nome?: string | null
          numero_whatsapp: string
          recebeu_link_grupo?: boolean | null
        }
        Update: {
          created_at?: string | null
          nivel?: string | null
          nome?: string | null
          numero_whatsapp?: string
          recebeu_link_grupo?: boolean | null
        }
        Relationships: []
      }
      usuarios_fruit: {
        Row: {
          created_at: string | null
          id: number
          last_activity: string | null
          nome: string | null
          telefone: string | null
          total_consultas: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_activity?: string | null
          nome?: string | null
          telefone?: string | null
          total_consultas?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          last_activity?: string | null
          nome?: string | null
          telefone?: string | null
          total_consultas?: number | null
        }
        Relationships: []
      }
      vendas: {
        Row: {
          canal_venda: string | null
          cliente_id: number
          data_venda: string
          forma_pagamento: string | null
          id: number
          observacao: string | null
          produto_name: string | null
          status_pedido: string | null
          valor: number | null
          valor_total: number
        }
        Insert: {
          canal_venda?: string | null
          cliente_id: number
          data_venda: string
          forma_pagamento?: string | null
          id?: number
          observacao?: string | null
          produto_name?: string | null
          status_pedido?: string | null
          valor?: number | null
          valor_total: number
        }
        Update: {
          canal_venda?: string | null
          cliente_id?: number
          data_venda?: string
          forma_pagamento?: string | null
          id?: number
          observacao?: string | null
          produto_name?: string | null
          status_pedido?: string | null
          valor?: number | null
          valor_total?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_documents: {
        Args: { filter: Json; match_count: number; query_embedding: string }
        Returns: {
          id: number
          content: string
          metadata: Json
          embedding: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
