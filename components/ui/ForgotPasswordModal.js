// components/ui/ForgotPasswordModal.js
import React, { useState } from 'react';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          error: null,
          success: true
        });
        // Cerrar el modal después de 3 segundos
        setTimeout(onClose, 3000);
      } else {
        throw new Error(data.error || 'Error al procesar la solicitud');
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message,
        success: false
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Recuperar Contraseña
        </h2>

        {status.success ? (
          <div className="text-center">
            <div className="mb-4 text-green-500">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="text-gray-600">
              Te hemos enviado un email con las instrucciones para restablecer tu contraseña.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {status.error && (
              <div className="text-red-500 text-sm">{status.error}</div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                  status.loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={status.loading}
              >
                {status.loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;