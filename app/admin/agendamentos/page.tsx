"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAppointments, confirmAppointment } from "../../appointments/appointments"
import type { Appointments } from "../../types/appointment"

export default function AdminAgendamentosPage() {
  const [appointments, setAppointments] = useState<Appointments[]>([])
  const [loading, setLoading] = useState(true)

  async function loadAppointments() {
    const { data, error } = await getAppointments()
    if (!error) setAppointments(data || [])
    setLoading(false)
  }

  async function handleConfirm(id: string) {
    await confirmAppointment(id)
    await loadAppointments() // recarrega lista
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  if (loading) return <p>Carregando agendamentos...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-serif font-light mb-4">Agendamentos</h1>

      {appointments.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appt) => {
            console.log("APPOINTMENT RECEBIDO:", appt)   // <--- LOG AQUI

            return (
              <li
                key={appt.id}
                className="flex items-center justify-between gap-4 border-b py-2"
              >
                <div>
                  <p className="font-medium">{appt.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString()} - {appt.time}
                  </p>

                  <p className="text-xs mt-1">
                    Status:{" "}
                    <span
                      className={
                        appt.status === "confirmado"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>

                {appt.status === "pendente" ? (
                  <button
                    onClick={() => handleConfirm(appt.id!)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
                  >
                    Confirmar
                  </button>
                ) : (
                  <a
                    href={`/admin/fichas/novo?nome=${encodeURIComponent(
                      appt.name
                    )}&email=${encodeURIComponent(appt.email || "")}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Criar Ficha
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
