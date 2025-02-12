// pages/cancel.js
import { useRouter } from 'next/router';

export default function Cancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Pago Cancelado</h2>
        <p className="text-gray-600 mb-6">Has cancelado el proceso de pago.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}