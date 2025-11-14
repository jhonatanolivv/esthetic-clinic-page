  import { supabase } from '../../lib/supabaseClient'
  import type { Appointments } from '../types/appointment'

  export async function saveAppointment(appointment: Appointments) {
    const { data, error } = await supabase
      .from('Appointments') 
      .insert([appointment])

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
