import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Droplet, Zap, Heart, Star, Flower2 } from "lucide-react"

const services = [
  {
    icon: Sparkles,
    title: "Limpeza de Pele",
    description: "Tratamento profundo que remove impurezas, revitaliza e deixa sua pele radiante e saudável.",
  },
  {
    icon: Droplet,
    title: "Botox",
    description:
      "Aplicação precisa para suavizar linhas de expressão e proporcionar um aspecto natural e rejuvenescido.",
  },
  {
    icon: Zap,
    title: "Depilação a Laser",
    description:
      "Tecnologia avançada para remoção definitiva de pelos com segurança, conforto e resultados duradouros.",
  },
  {
    icon: Heart,
    title: "Preenchimento Facial",
    description: "Restaure o volume e contorno facial com técnicas modernas para um resultado harmonioso.",
  },
  {
    icon: Star,
    title: "Peeling Químico",
    description: "Renovação celular profunda para melhorar textura, manchas e uniformizar o tom da pele.",
  },
  {
    icon: Flower2,
    title: "Harmonização Facial",
    description: "Procedimentos combinados para equilibrar proporções e realçar a beleza natural do seu rosto.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-balance">Nossos Serviços</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Tratamentos personalizados com tecnologia de ponta para realçar sua beleza
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
