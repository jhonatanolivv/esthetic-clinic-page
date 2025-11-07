export interface Ficha {
  id?: number // ⬅️ Deixa opcional
  nome: string
  email: string
  telefone?: string
  data_nascimento?: string
  sintomas?: string
  observacoes?: string
  created_at?: string
}
