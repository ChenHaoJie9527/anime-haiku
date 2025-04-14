import type React from "react"
import type { Metadata } from "next"
import { Ubuntu, Ubuntu_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/sonner" 

const ubuntuSans = Ubuntu({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
})
const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Anime.js Showcase",
  description: "Explore anime.js v4 animation examples",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ubuntuSans.variable} ${ubuntuMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-5xl mx-auto">{children}</div>
            </main>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}


import './globals.css'