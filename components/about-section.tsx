import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
            <Image
              src="/professional-female-doctor-in-elegant-white-coat-a.jpg"
              alt="Dra. Belle - Médica Especialista"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-balance">
                Dra. Isabella Belle
              </h2>
              <p className="text-lg text-primary font-medium">Médica Dermatologista | CRM 12345</p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Com mais de 15 anos de experiência em dermatologia estética, a Dra. Isabella Belle é referência em
                tratamentos faciais e corporais que respeitam a individualidade de cada paciente.
              </p>
              <p>
                Formada pela Universidade de São Paulo e com especialização internacional em harmonização facial, ela
                combina técnica apurada com sensibilidade artística para resultados naturais e elegantes.
              </p>
              <p>
                Na Clínica Belle, cada procedimento é realizado com atenção aos mínimos detalhes, priorizando sua
                segurança, conforto e satisfação.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Membro da Sociedade Brasileira de Dermatologia</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Especialização em Harmonização Facial</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Certificação Internacional em Estética Avançada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
