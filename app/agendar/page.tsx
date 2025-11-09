"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Calendar, { type CalendarProps } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { saveAppointment } from "@/app/appoitments/appoitments" // 👈 importa função de salvar

// Define o tipo correto para o valor do calendário
type Value = NonNullable<CalendarProps["value"]>

const AVAILABLE_TIMES = ["10:00", "11:00", "14:00", "15:00", "16:00"]

export default function AgendarPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)

  // Manipula a mudança de data
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value)
      setSelectedTime(null)
      setShowForm(false)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setShowForm(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // 👇 Função corrigida: agora salva o agendamento no Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) {
      alert("Por favor, selecione uma data e horário.")
      return
    }

    setLoading(true)

    const appointment = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: selectedDate.toISOString(),
      time: selectedTime,
    }

    const { error } = await saveAppointment(appointment)

    setLoading(false)

    if (error) {
      console.error("Erro ao salvar o agendamento:", error)
      alert("Erro ao salvar o agendamento. Tente novamente.")
      return
    }

    const params = new URLSearchParams({
      name: formData.name,
      date: selectedDate.toISOString(),
      time: selectedTime,
    })

    router.push(`/agendar/confirmacao?${params.toString()}`)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 px-4 py-12 pt-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-balance mb-3">
            Agende sua Consulta
          </h1>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            Selecione uma data e horário disponível para sua consulta na Clínica Belle
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-serif font-light mb-4">Escolha uma data</h2>
              <div className="calendar-wrapper">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  locale="pt-BR"
                />
              </div>
            </div>

            <div>
              {selectedDate && (
                <>
                  <h2 className="text-xl font-serif font-light mb-4">Horários disponíveis</h2>
                  <p className="text-sm text-muted-foreground mb-4 capitalize">
                    {formatDate(selectedDate)}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {AVAILABLE_TIMES.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50 hover:bg-muted"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {showForm && (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-serif font-light mb-3">Seus dados</h3>

                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Digite seu nome completo"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="(54) 99614-2574"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="seu@email.com"
                          className="bg-background"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? "Salvando..." : "Confirmar Agendamento"}
                      </Button>
                    </form>
                  )}
                </>
              )}

              {!selectedDate && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  <p className="text-pretty">
                    Selecione uma data no calendário para ver os horários disponíveis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Dúvidas? Entre em contato pelo telefone{" "}
            <strong className="text-foreground">(54) 99614-2574</strong>
          </p>
        </div>
      </div>
    </main>
  )
}
