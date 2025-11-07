"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAppointments } from "../../appointments/appointments"
import type { Appointment } from "../../types/appointment"

export default function AdminAgendamentosPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAppointments() {
      const { data, error } = await getAppointments()
      if (error) {
        console.error(error)
      } else {
        setAppointments(data || [])
      }
      setLoading(false)
    }

    fetchAppointments()
  }, [])

  if (loading) return <p>Carregando agendamentos...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-serif font-light mb-4">Agendamentos</h1>

      {appointments.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appt) => (
            <li key={appt.id} className="flex items-center justify-between gap-4 border-b py-2">
  <div>
    <p className="font-medium">{appt.name}</p>
    <p className="text-sm text-gray-500">
      {new Date(appt.date).toLocaleDateString()} - {appt.time}
    </p>
  </div>

  <a
    href={`/admin/fichas/novo?nome=${encodeURIComponent(appt.name)}&email=${encodeURIComponent(appt.email || '')}`}
    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
  >
    Criar Ficha
  </a>
</li>

          ))}
        </ul>
      )}
    </div>
  )
}
