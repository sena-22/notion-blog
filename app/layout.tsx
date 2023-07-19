import {Metadata} from 'next'
import './globals.css'
import Navigation from '@/components/Navigation/Navigation'

export const metadata: Metadata = {
  title: "Sena's Blog",
  description: 'untitled',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center justify-center dark:bg-zinc-800">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
