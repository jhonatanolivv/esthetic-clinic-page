import { supabase } from "../../lib/supabaseClient"
import type { Ficha } from "../types/ficha"

// ----------------------------------------------------------
// Criar Ficha
// ----------------------------------------------------------
export async function createFicha(ficha: Omit<Ficha, "id" | "created_at">) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("Usuário não autenticado", userError)
    throw new Error("Usuário não autenticado")
  }

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

// ----------------------------------------------------------
// Buscar Fichas
// ----------------------------------------------------------
export async function getFichas(): Promise<Ficha[]> {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("Usuário não autenticado", userError)
    throw new Error("Usuário não autenticado")
  }

  const { data, error } = await supabase
    .from("fichas")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar fichas:", error)
    throw error
  }

  return data || []
}
