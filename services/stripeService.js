// services/stripeService.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
  }
};

export default stripeService;