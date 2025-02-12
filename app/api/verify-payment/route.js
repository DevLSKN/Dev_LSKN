// app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    console.log('Verificando sesión:', sessionId);

    if (!sessionId) {
      console.error('No se proporcionó session_id');
      return NextResponse.json(
        { error: 'Session ID no proporcionado' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Sesión recuperada:', {
      paymentStatus: session.payment_status,
      metadata: session.metadata
    });

    if (session.payment_status === 'paid') {
      const { userId, serviceId } = session.metadata || {};
      console.log('Metadata de la sesión:', { userId, serviceId });

      if (userId && serviceId) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
          console.log('Intentando registrar servicio en:', `${baseUrl}/api/user/services`);

          const registerResponse = await fetch(`${baseUrl}/api/user/services`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userId,
              servicio: serviceId,
              createdAt: new Date().toISOString()
            }),
          });

          const registerResult = await registerResponse.json();
          console.log('Resultado del registro del servicio:', registerResult);

          if (!registerResponse.ok) {
            throw new Error(registerResult.error || 'Error al registrar el servicio');
          }
        } catch (error) {
          console.error('Error detallado al registrar servicio:', error);
          throw error;
        }
      } else {
        console.error('Faltan datos en metadata:', session.metadata);
      }
    }

    return NextResponse.json({
      success: session.payment_status === 'paid',
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total,
      currency: session.currency,
      metadata: session.metadata
    });
  } catch (error) {
    console.error('Error completo en verify-payment:', error);
    return NextResponse.json(
      { error: error.message || 'Error al verificar el pago' },
      { status: 500 }
    );
  }
}