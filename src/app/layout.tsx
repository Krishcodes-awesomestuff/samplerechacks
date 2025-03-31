import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'REC Hacks - National Level Hackathon',
  description: 'Join us for an epic intra-college national level hackathon at REC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/samplerechacks/globals.css" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen bg-black">
          {children}
        </main>
      </body>
    </html>
  )
}
