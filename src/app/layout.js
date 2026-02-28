import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Link from "next/link"; 
import AppShell from '@/components/AppShell'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Attor | Editorial de obras multiformato",
  description: "Espacio para crear, publicar y leer obras editoriales en diversos formatos, fomentando la creatividad y el acceso a las historias que tienen mas de una forma de contarse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
