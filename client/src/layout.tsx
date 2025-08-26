import type React from "react"
import "./global.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-background to-accent/20">{children}</body>
    </html>
  )
}
