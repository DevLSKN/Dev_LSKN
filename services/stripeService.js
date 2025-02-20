// services/stripeService.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const calcularPrecioMensualidad = () => {
  const hoy = new Date();
  const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
  const diasRestantes = ultimoDiaMes - hoy.getDate() + 1;
  const precioPorDia = 70 / ultimoDiaMes;
  return Math.round(precioPorDia * diasRestantes * 100) / 100;
};

const stripeService = {
  async createCheckoutSession(serviceId, userId) {
    try {
      console.log('Creating checkout session:', { serviceId, userId });
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el servidor');
      }

      const session = await response.json();
      console.log('Checkout session created:', session);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Redirect error:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error in createCheckoutSession:', error);
      throw error;
    }
  },

  async createMatriculaCheckoutSession(userId) {
    try {
      console.log('Creating matricula checkout session:', { userId });
      
      // Usar el mismo endpoint que los otros servicios
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: 'MATRICULA',
          userId: userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el servidor');
      }

      const session = await response.json();
      console.log('Matricula session created:', session);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Redirect error:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error in createMatriculaCheckoutSession:', error);
      throw error;
    }
  },

  async verifyPaymentStatus(sessionId) {
    try {
      console.log('Verifying payment status for session:', sessionId);
      
      const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
      const data = await response.json();
      
      console.log('Payment verification result:', data);
      
      return data;
    } catch (error) {
      console.error('Error in verifyPaymentStatus:', error);
      throw error;
    }
  },
  
  async checkMatriculaStatus(userId) {
    try {
      console.log('Verificando estado de matrícula para usuario:', userId);
      
      const response = await fetch(`/api/check-matricula-status?userId=${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al verificar la matrícula');
      }
      
      const data = await response.json();
      console.log('Resultado de verificación de matrícula:', data);
      
      return data;
    } catch (error) {
      console.error('Error en checkMatriculaStatus:', error);
      throw error;
    }
  },
  getPrecioMatricula() {
    const precioMensualidad = calcularPrecioMensualidad();
    return {
      matricula: 20, // Precio fijo de la matrícula
      mensualidad: precioMensualidad,
      total: 20 + precioMensualidad
    };
  }
};

export default stripeService;