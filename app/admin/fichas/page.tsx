"use client"

import { useEffect, useState } from "react"
import { getFichas } from "../../services/fichas" // ou onde você colocar a função
import type { Ficha } from "../../types/ficha" // crie o tipo

export default function AdminFichasPage() {
  const [fichas, setFichas] = useState<Ficha[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFichas() {
      try {
        const fichasData = await getFichas() // retorna Ficha[]
        setFichas(fichasData || [])
      } catch (err) {
        console.error("Erro ao buscar fichas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFichas()
  }, [])

  if (loading) return <p>Carregando fichas...</p>

  return (
    <div>
      <h1>Fichas de Pacientes</h1>
      {fichas.length === 0 ? (
        <p>Nenhuma ficha encontrada.</p>
      ) : (
        <ul>
          {fichas.map((f) => (
            <li key={f.id}>
              {f.nome} - {f.data_nascimento} {/* use o campo correto do tipo Ficha */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
