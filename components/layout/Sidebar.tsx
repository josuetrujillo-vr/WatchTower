'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  FileWarning,
  MapPin,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const navItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['GUARD', 'SUPERVISOR', 'ADMIN'],
  },
  {
    label: 'Incidencias',
    href: '/incidents',
    icon: FileWarning,
    roles: ['GUARD', 'SUPERVISOR', 'ADMIN'],
  },
  {
    label: 'Mapa',
    href: '/map',
    icon: MapPin,
    roles: ['SUPERVISOR', 'ADMIN'],
  },
  {
    label: 'Administración',
    href: '/admin',
    icon: Settings,
    roles: ['ADMIN'],
  },
  {
    label: 'Usuarios',
    href: '/admin/users',
    icon: Users,
    roles: ['ADMIN'],
  },
];

const roleLabels = {
  GUARD: { label: 'Guardia', color: 'bg-slate-500' },
  SUPERVISOR: { label: 'Supervisor', color: 'bg-blue-500' },
  ADMIN: { label: 'Administrador', color: 'bg-primary' },
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const filteredNav = navItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-bold text-white text-sm">SecureReport</p>
          <p className="text-xs text-slate-500">Panel de control</p>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-3 w-3 opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Usuario */}
      {user && (
        <div className="px-3 py-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <Badge
                className={cn(
                  'text-[10px] px-1.5 py-0 text-white border-0',
                  roleLabels[user.role].color
                )}
              >
                {roleLabels[user.role].label}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-400/10 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      )}
    </aside>
  );
}