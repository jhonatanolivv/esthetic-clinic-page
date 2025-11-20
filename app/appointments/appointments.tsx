import { supabase } from '../../lib/supabaseClient'
import type { Appointments } from '../types/appointment'

export async function saveAppointment(appointment: Appointments) {
  const { data, error } = await supabase
    .from('Appointments')
    .insert([{ ...appointment, status: "pendente" }])

  if (error) console.error('Erro ao salvar agendamento:', error)
  return { data, error }
}

export async function getAppointments() {
  const { data, error } = await supabase
    .from('Appointments')
    .select('*')
    .order('date', { ascending: true })

  if (error) console.error('Erro ao buscar agendamentos:', error)
  return { data, error }
}

export async function confirmAppointment(id: string) {
  const { data, error } = await supabase
    .from('Appointments')
    .update({ status: "confirmado" })
    .eq("id", id)
    .select() 

    console.log("Resultado:", { data, error })

  if (error) console.error("Erro ao confirmar agendamento:", error)
  return { data, error }
}
 