import {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Sena's Blog",
  description: 'untitled',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark:bg-zinc-900">{children}</body>
    </html>
  )
}
