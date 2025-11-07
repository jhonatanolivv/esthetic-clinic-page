"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import { signIn } from "@/app/auth/auth"

// E-mail da médica que terá acesso
const MEDICA_EMAIL = "grazivelaski@gmail.com"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { user, error: authError } = await signIn(formData.email, formData.password)
    setLoading(false)

    if (authError || !user) {
      setError("E-mail ou senha incorretos")
      return
    }

    // Verifica se é o e-mail da médica
    if (user.email !== MEDICA_EMAIL) {
      setError("Acesso negado: apenas a médica tem permissão")
      return
    }

    // Marca sessão local para o front-end
    localStorage.setItem("adminAuth", "true")
    router.push("/admin")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight mb-2">Clínica Belle</h1>
          <p className="text-muted-foreground">Painel Administrativo</p>
        </div>

        {/* Card de Login */}
        <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-8">
          <h2 className="text-2xl font-serif font-light mb-6">Acesso Restrito</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Seu e-mail"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="bg-background"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
