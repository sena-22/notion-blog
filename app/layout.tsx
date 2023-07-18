import {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Sena's Blog",
  description: 'untitled',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="flex justify-center dark:bg-zinc-800">{children}</body>
    </html>
  )
}
