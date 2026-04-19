import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HydrationGuard from '@/components/shared/HydrationGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecureReport',
  description: 'Sistema de Gestión de Incidencias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 antialiased`} suppressHydrationWarning>
        <HydrationGuard>
          {children}
        </HydrationGuard>
      </body>
    </html>
  );
}