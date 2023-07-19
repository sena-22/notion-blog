import {Metadata} from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: "Sena's Blog",
  description: 'untitled',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center justify-center dark:bg-zinc-800">{children}</body>
    </html>
  )
}
