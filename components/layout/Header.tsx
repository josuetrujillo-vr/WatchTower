'use client';

import { usePathname } from 'next/navigation';
import { Bell, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import MobileNav from './MobileNav';

const pageTitles: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Dashboard',
    description: 'Resumen general de incidencias',
  },
  '/incidents': {
    title: 'Incidencias',
    description: 'Gestión y seguimiento de reportes',
  },
  '/incidents/new': {
    title: 'Nueva Incidencia',
    description: 'Registrar un nuevo reporte',
  },
  '/map': {
    title: 'Mapa',
    description: 'Distribución geográfica de incidencias',
  },
  '/admin': {
    title: 'Administración',
    description: 'Configuración del sistema',
  },
  '/admin/users': {
    title: 'Usuarios',
    description: 'Gestión de cuentas y permisos',
  },
};

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const page = pageTitles[pathname] ?? {
    title: 'SecureReport',
    description: '',
  };

  return (
    <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Título de página + menú mobile */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <div>
            <h1 className="font-bold text-white text-base leading-tight">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-xs text-slate-400 hidden sm:block">
                {page.description}
              </p>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Botón nueva incidencia — visible para todos */}
          {user?.role !== 'ADMIN' && (
            <Link href="/incidents/new">
              <Button size="sm" className="gap-1.5 hidden sm:flex">
                <Plus className="h-3.5 w-3.5" />
                Nueva incidencia
              </Button>
            </Link>
          )}

          {/* Notificaciones */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-400 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}