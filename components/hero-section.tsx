import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm text-muted-foreground mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Bem-estar e beleza em harmonia</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-balance">
          Realce sua beleza natural
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          Na Clínica Belle, oferecemos tratamentos estéticos de excelência com tecnologia de ponta e cuidado
          personalizado para você se sentir ainda mais confiante.
        </p>

        <div className="pt-4">
          <Button asChild size="lg" className="text-base px-8 py-6 rounded-full">
            <Link href="/agendar">Agendar Agora</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
