// pages/success.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import stripeService from '../services/stripeService';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [status, setStatus] = useState('loading');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (session_id) {
      verifyPayment();
    }
  }, [session_id]);

  const verifyPayment = async () => {
    try {
      const result = await stripeService.verifyPaymentStatus(session_id);
      if (result.success) {
        setStatus('success');
        setPaymentDetails(result);
        // Esperar 5 segundos antes de redirigir
        setTimeout(() => {
          router.push('/');
        }, 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error verificando pago:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {status === 'loading' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Verificando tu pago...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">¡Pago exitoso!</h2>
            {paymentDetails && (
              <div className="text-left bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Monto: {(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency.toUpperCase()}
                </p>
                {paymentDetails.customerEmail && (
                  <p className="text-sm text-gray-600">
                    Email: {paymentDetails.customerEmail}
                  </p>
                )}
              </div>
            )}
            <p className="text-gray-600 mb-4">Tu servicio ha sido activado correctamente.</p>
            <p className="text-sm text-gray-500">Serás redirigido a la página principal en unos segundos...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error en el pago</h2>
            <p className="text-gray-600 mb-4">Hubo un problema al procesar tu pago.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}