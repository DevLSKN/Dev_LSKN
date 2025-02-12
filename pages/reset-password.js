// pages/reset-password.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Key, Lock, Loader } from 'lucide-react';

// Añadimos un layout base
const BaseLayout = ({ children }) => (
  <div style={{ 
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #2563eb, #1e40af)',
    padding: '20px'
  }}>
    {children}
  </div>
);

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: passwords.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          error: null,
          success: true
        });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error(data.error || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message,
        success: false
      });
    }
  };

  if (!token) {
    return (
      <BaseLayout>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Key className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Enlace no válido
            </h2>
            <p className="text-gray-600 mb-8">
              El enlace para restablecer la contraseña no es válido o ha expirado.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {status.success ? (
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Contraseña actualizada!
            </h2>
            <p className="text-gray-600 mb-4">
              Tu contraseña ha sido actualizada correctamente.
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-gray-500">
                Redirigiendo a la página de inicio...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Nueva contraseña
              </h2>
              <p className="text-gray-600">
                Por favor, ingresa tu nueva contraseña
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-blue-700 font-medium">
                La contraseña debe contener:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
                <li>Al menos 8 caracteres</li>
                <li>Una letra mayúscula</li>
                <li>Una letra minúscula</li>
                <li>Un número o símbolo</li>
              </ul>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={passwords.password}
                  onChange={(e) => setPasswords(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>

              {status.error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-sm text-red-700">{status.error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status.loading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Procesando...
                  </div>
                ) : (
                  'Establecer nueva contraseña'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Volver al inicio
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </BaseLayout>
  );
}