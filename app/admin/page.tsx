"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, FileText, Phone, Mail } from "lucide-react"

import { getAgendamentos } from "../services/agendamentos"
import { getFichas } from "@/app/services/fichas"

// Define os tipos esperados
interface Agendamento {
  id: string
  nome_paciente: string
  data: string
  hora: string
  status?: string
}

interface Ficha {
  id: string
  nome: string
  idade: number
  telefone?: string
  email?: string
  alergias?: string
  cirurgias?: string
  observacoes?: string
}

export default function AdminDashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [fichas, setFichas] = useState<Ficha[]>([])
  const [selectedFicha, setSelectedFicha] = useState<Ficha | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editedObservacoes, setEditedObservacoes] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const agendamentosResponse: any = await getAgendamentos()
        const fichasResponse: any = await getFichas()

        // Trata corretamente se o retorno for { data, error } ou array direto
        const agendamentosData: Agendamento[] = (Array.isArray(agendamentosResponse)
        ? agendamentosResponse
        : agendamentosResponse?.data || []
        ).map((appt: any) => ({
        id: appt.id,
        nome_paciente: appt.name,
        data: appt.date,
        hora: appt.time,
        status: appt.status || "pendente"
        }))


        const fichasData: Ficha[] = Array.isArray(fichasResponse)
          ? fichasResponse
          : fichasResponse?.data || []

        setAgendamentos(agendamentosData)
        setFichas(fichasData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    }

    fetchData()
  }, [])

  const handleVerFicha = (ficha: Ficha) => {
    setSelectedFicha(ficha)
    setEditedObservacoes(ficha.observacoes || "")
    setIsModalOpen(true)
  }

  const handleSalvarAlteracoes = () => {
    console.log("[v0] Salvando alterações:", {
      id: selectedFicha?.id,
      observacoes: editedObservacoes,
    })
    setIsModalOpen(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-light tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Gerencie agendamentos e fichas de pacientes</p>
      </div>

      <Tabs defaultValue="agendamentos" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="fichas">Fichas de Anamnese</TabsTrigger>
        </TabsList>

        {/* AGENDAMENTOS */}
        <TabsContent value="agendamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-light">Próximos Agendamentos</CardTitle>
              <CardDescription>Lista de consultas agendadas</CardDescription>
            </CardHeader>
            <CardContent>
              {agendamentos.length > 0 ? (
                <div className="space-y-3">
                  {agendamentos.map((agendamento) => (
                    <div
                      key={agendamento.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{agendamento.nome_paciente}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(agendamento.data)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {agendamento.hora}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={agendamento.status === "confirmado" ? "default" : "secondary"}>
                        {agendamento.status || "pendente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum agendamento encontrado.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FICHAS */}
        <TabsContent value="fichas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-light">Fichas de Pacientes</CardTitle>
              <CardDescription>Histórico médico e observações</CardDescription>
            </CardHeader>
            <CardContent>
              {fichas.length > 0 ? (
                <div className="space-y-3">
                  {fichas.map((ficha) => (
                    <div
                      key={ficha.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{ficha.nome}</p>
                          <p className="text-sm text-muted-foreground">{ficha.idade} anos</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleVerFicha(ficha)}>
                        Ver Ficha
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma ficha encontrada.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* MODAL DE FICHA */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif font-light text-2xl">Ficha de Anamnese</DialogTitle>
          </DialogHeader>

          {selectedFicha && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Nome Completo</Label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{selectedFicha.nome}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Idade</Label>
                  <p className="font-medium">{selectedFicha.idade} anos</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Telefone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{selectedFicha.telefone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">E-mail</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{selectedFicha.email}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Alergias</Label>
                  <Input value={selectedFicha.alergias || ""} readOnly className="bg-muted/30" />
                </div>

                <div className="space-y-2">
                  <Label>Cirurgias Prévias</Label>
                  <Input value={selectedFicha.cirurgias || ""} readOnly className="bg-muted/30" />
                </div>

                <div className="space-y-2">
                  <Label>Observações e Histórico</Label>
                  <Textarea
                    value={editedObservacoes}
                    onChange={(e) => setEditedObservacoes(e.target.value)}
                    rows={6}
                    className="resize-none"
                    placeholder="Adicione observações sobre o paciente..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSalvarAlteracoes}>Salvar Alterações</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
