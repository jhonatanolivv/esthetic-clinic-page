import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const _geist = GeistSans
const _cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Clínica Belle - Estética e Bem-estar",
  description: "Tratamentos estéticos de excelência com tecnologia de ponta e cuidado personalizado",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_cormorant.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
