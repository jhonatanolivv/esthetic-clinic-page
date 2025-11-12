export interface Ficha {
  id?: string            // uuid -> string
  nome: string
  email: string
  telefone?: string
  data_nascimento?: string
  sintomas?: string
  observacoes?: string
  user_id?: string       // <-- adiciona aqui
  created_at?: string
}
