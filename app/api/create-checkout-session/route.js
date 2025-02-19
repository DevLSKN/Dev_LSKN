// app/api/create-checkout-session/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const STRIPE_PRICE_IDS = {
  'DAY PASS': {
    priceId: 'price_1QrIOgPQf67HyXqEiTRO5gYq',
    mode: 'payment'
  },
  'BONO (5 DAY PASS)': {
    priceId: 'price_1QrFUXPQf67HyXqEEK4RnKWe',
    mode: 'payment'
  },
  'BONO (10 DAY PASS)': {
    priceId: 'price_1QrDZmPQf67HyXqEqHqtyKRb',
    mode: 'payment'
  },
  'MENSUALIDAD': {
    priceId: 'price_1QrfkdPQf67HyXqET5ZZgIOL',
    mode: 'subscription'
  },
  'MATRICULA': {
    priceId: 'price_1QuIwpPQf67HyXqENflXaHgV', // Aquí pon el ID que obtuviste al crear el producto en Stripe
    mode: 'subscription',
    matricula: true
  },
  'ENTRENAMIENTO PERSONAL': {
    priceId: 'price_ID_de_tu_entrenamiento',
    mode: 'payment'
  },
  'DIETA + RUTINA': {
    priceId: 'price_ID_de_tu_dieta',
    mode: 'payment'
  }
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

    const serviceConfig = STRIPE_PRICE_IDS[serviceId];
    if (!serviceConfig) {
      return NextResponse.json(
        { error: 'Servicio no válido o sin precio configurado' },
        { status: 400 }
      );
    }

    // Configuración base de la sesión
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: serviceConfig.priceId,
          quantity: 1,
        },
      ],
      mode: serviceConfig.mode,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: userId,
        serviceId: serviceId
      }
    };

    // Configuración especial para matrícula
    if (serviceConfig.matricula) {
      sessionConfig.subscription_data = {
        trial_end: Math.floor(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime() / 1000),
      };
      
      // Sobreescribir line_items para incluir tanto la matrícula como la mensualidad
      sessionConfig.line_items = [
        {
          price: serviceConfig.priceId, // Precio de la matrícula
          quantity: 1,
        },
        {
          price: STRIPE_PRICE_IDS['MENSUALIDAD'].priceId, // Precio de la mensualidad
          quantity: 1,
        }
      ];
    }

    // Para suscripciones, podemos añadir configuraciones específicas
    if (serviceConfig.mode === 'subscription') {
      sessionConfig.billing_address_collection = 'required';
      sessionConfig.payment_method_collection = 'always';
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('Session created:', {
      id: session.id,
      metadata: session.metadata,
      mode: session.mode
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