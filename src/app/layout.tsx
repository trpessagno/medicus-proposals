import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicus B2B - Generador de Propuestas",
  description: "Sistema de gestión y generación de propuestas comerciales para Medicus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
