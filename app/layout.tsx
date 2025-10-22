import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const URL_BASE = "https://sudoku.edelbyte.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(URL_BASE),
  title: {
    default: "Sudoku Game",
    template: "%s | Sudoku Game",
  },
  description:
    "El Sudoku consiste en rellenar una cuadrícula de 9x9 celdas (dividida en nueve subcuadrículas de 3x3 con los números del 1 al 9, de forma que cada número aparezca solo una vez en cada fila, columna y subcuadrícula",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: URL_BASE,
    languages: {
      "es-AR": `${URL_BASE}`,
    },
  },
  openGraph: {
    title: "Juego del Sudoku",
    description:
      "Juego del Sudoku para ejercitar la mente",
    siteName: URL_BASE,
    images: [
      {
        url: "https://susoku.edelbyte.com.ar/sudoku.jpg",
        width: 1200,
        height: 630,
        alt: "Juego de Sudoku | Sudoku Game",
      },
    ],
    locale:"es-AR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut:"/favicon-16x16.png",
    apple:"/apple-touch-icon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
