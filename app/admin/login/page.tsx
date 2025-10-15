"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simulação de login (em produção, usar autenticação real)
    if (formData.email === "admin@clinicabelle.com" && formData.password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      router.push("/admin")
    } else {
      setError("E-mail ou senha incorretos")
    }
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
                placeholder="admin@clinicabelle.com"
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

            <Button type="submit" size="lg" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>Credenciais de teste:</p>
            <p className="font-mono text-xs mt-1">admin@clinicabelle.com / admin123</p>
          </div>
        </div>
      </div>
    </main>
  )
}
