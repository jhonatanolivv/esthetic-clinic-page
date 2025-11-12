import { supabase } from "../../lib/supabaseClient"
import type { Ficha } from "../types/ficha"

export async function createFicha(ficha: Omit<Ficha, "id" | "created_at">) {
  // pega o user logado
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("Usuário não autenticado", userError)
    throw new Error("Usuário não autenticado")
  }

  // garante user_id no payload
  const payload = {
    ...ficha,
    user_id: user.id
  }

  const { data, error } = await supabase
    .from("fichas")
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error("Erro ao criar ficha:", error)
    throw error
  }

  return data
}
