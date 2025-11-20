import { supabase } from "@/lib/supabaseClient"

export async function getAgendamentos() {
  const { data, error } = await supabase
    .from("Appointments")
    .select("*")
    .eq("status", "confirmado")       // <--- FILTRA AQUI
    .order("date", { ascending: true })

  return { data, error }
}

