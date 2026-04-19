'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';

// ─── Schema de validación ─────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es requerido')
    .email('Ingresa un correo válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'Mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

// ─── Componente ───────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      // Por ahora simulamos el login hasta que el backend esté listo
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Usuario de prueba temporal
      const mockUser = {
        id: '1',
        name: 'Admin Temporal',
        email: data.email,
        employeeId: 'NOM-001',
        role: 'ADMIN' as const,
        area: 'Administración',
        createdAt: new Date().toISOString(),
      };

      setAuth(mockUser, 'mock-token-123');
      router.push('/');
    } catch {
      setError('Correo o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
      {/* Header */}
      <CardHeader className="space-y-4 text-center pb-2">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 border border-primary/20 p-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-white">
            SecureReport
          </CardTitle>
          <CardDescription className="text-slate-400 mt-1">
            Sistema de Gestión de Incidencias
          </CardDescription>
        </div>
      </CardHeader>

      {/* Formulario */}
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-300">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@empresa.com"
              autoComplete="email"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-primary"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-slate-300">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-primary pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Error global */}
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2">
              <p className="text-sm text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Botón */}
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          ¿Problemas para acceder? Contacta a tu administrador.
        </p>
      </CardContent>
    </Card>
  );
}