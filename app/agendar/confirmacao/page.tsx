"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home } from "lucide-react"
import { Suspense } from "react"

function ConfirmacaoContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Cliente"
  const date = searchParams.get("date") || ""
  const time = searchParams.get("time") || ""

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4 py-12 pt-16">
      <div className="max-w-md w-full">
        {/* Card de confirmação */}
        <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-8 text-center">
          {/* Ícone de check verde */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={2} />
            </div>
          </div>

          {/* Mensagem de sucesso */}
          <h1 className="text-3xl font-serif font-light tracking-tight text-balance mb-3">Agendamento Confirmado!</h1>
          <p className="text-muted-foreground text-pretty leading-relaxed mb-8">
            Seu agendamento foi confirmado com sucesso. Em breve entraremos em contato para confirmar os detalhes.
          </p>

          {/* Detalhes do agendamento */}
          <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nome</p>
              <p className="font-medium text-foreground">{name}</p>
            </div>
            <div className="border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground mb-1">Data</p>
              <p className="font-medium text-foreground capitalize">{formatDate(date)}</p>
            </div>
            <div className="border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground mb-1">Horário</p>
              <p className="font-medium text-foreground">{time}</p>
            </div>
          </div>

          {/* Botão para voltar */}
          <Button asChild size="lg" className="w-full">
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Voltar para a Página Inicial
            </Link>
          </Button>
        </div>

        {/* Informações de contato */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Dúvidas? Entre em contato pelo telefone <strong className="text-foreground">(54) 99614-55552574</strong>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function ConfirmacaoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
          <div className="text-muted-foreground">Carregando...</div>
        </main>
      }
    >
      <ConfirmacaoContent />
    </Suspense>
  )
}
