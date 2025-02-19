import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    // Crea la sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1QuIwpPQf67HyXqENflXaHgV', // Reemplazar con tu ID
          quantity: 1,
        },
        {
          price: 'price_1QrfkdPQf67HyXqET5ZZgIOL', // Reemplazar con tu ID
          quantity: 1,
        }
      ],
      mode: 'subscription',
      subscription_data: {
        trial_end: Math.floor(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime() / 1000),
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
      client_reference_id: userId,
      metadata: {
        tipo: 'matricula',
        userId: userId,
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear la sesión de pago' });
  }
}