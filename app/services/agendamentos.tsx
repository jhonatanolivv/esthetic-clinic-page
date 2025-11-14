import { supabase } from "@/lib/supabaseClient"

export async function getAgendamentos() {
  const { data, error } = await supabase
    .from("Appointments")
    .select("*")
    .order("data", { ascending: true })

  return { data, error }
}
