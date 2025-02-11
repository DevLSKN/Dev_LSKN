import './globals.css'

export const metadata = {
  title: 'LAIESKEN',
  description: 'LAIESKEN Landing Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}