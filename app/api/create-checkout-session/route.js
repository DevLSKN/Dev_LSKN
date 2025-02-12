// app/api/create-checkout-session/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const STRIPE_PRICE_IDS = {
  'DAY PASS': 'price_1QrIOgPQf67HyXqEiTRO5gYq',
  'BONO (5 DAY PASS)': 'price_1QrFUXPQf67HyXqEEK4RnKWe',
  'BONO (10 DAY PASS)': 'price_1QrDZmPQf67HyXqEqHqtyKRb',
  'MENSUALIDAD': 'price_ID_de_tu_mensualidad',
  'ENTRENAMIENTO PERSONAL': 'price_ID_de_tu_entrenamiento',
  'DIETA + RUTINA': 'price_ID_de_tu_dieta'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { serviceId, userId } = body;

    console.log('Creating session for:', { serviceId, userId });

    if (!serviceId || !userId) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (serviceId o userId)' },
        { status: 400 }
      );
    }

    const priceId = STRIPE_PRICE_IDS[serviceId];
    if (!priceId) {
      return NextResponse.json(
        { error: 'Servicio no válido o sin precio configurado' },
        { status: 400 }
      );
    }

    // Crear la sesión usando el ID de precio existente
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: userId,
        serviceId: serviceId
      }
    });

    console.log('Session created:', {
      id: session.id,
      metadata: session.metadata
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error in create-checkout-session:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear la sesión de pago' },
      { status: 500 }
    );
  }
}