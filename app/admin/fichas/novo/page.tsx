"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createFicha } from "../../../services/fichas"

export default function NovaFichaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nomeParam = searchParams.get("nome") || ""
  const emailParam = searchParams.get("email") || ""

  const [nome, setNome] = useState(nomeParam)
  const [email, setEmail] = useState(emailParam)
  const [telefone, setTelefone] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const novaFicha = {
      nome,
      email,
      telefone,
      data_nascimento: dataNascimento,
      sintomas,
      observacoes,
    }

    const { data, error } = await createFicha(novaFicha)

    if (error) {
      console.error("Erro ao criar ficha:", error)
      alert("Erro ao salvar a ficha.")
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/fichas")
      }, 1500)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Nova Ficha de Paciente</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sintomas</label>
          <textarea
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Observações</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Ficha"}
        </button>
      </form>

      {success && <p className="mt-4 text-green-600">Ficha salva com sucesso!</p>}
    </div>
  )
}
