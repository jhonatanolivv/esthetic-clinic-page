import { supabase } from "../../lib/supabaseClient"
import type { Ficha } from "../types/ficha"

// Busca todas as fichas
export async function getFichas(): Promise<Ficha[]> {
  const { data, error } = await supabase
    .from("fichas")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Erro ao buscar fichas:", error)
    throw error
  }

  return data || []
}

// Cria uma nova ficha
export async function createFicha(ficha: Omit<Ficha, "id">) {
  const { data, error } = await supabase.from("fichas").insert([ficha]).select().single()

  if (error) {
    console.error("Erro ao criar ficha:", error)
    throw error
  }

  return data
}
