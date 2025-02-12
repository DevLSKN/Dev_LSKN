// app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import UserService from '../../../models/UserService';

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

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']  // Expandir los datos de suscripción
    });
    
    console.log('Sesión recuperada:', {
      paymentStatus: session.payment_status,
      metadata: session.metadata,
      mode: session.mode,
      subscription: session.subscription
    });

    if (session.payment_status === 'paid') {
      const { userId, serviceId } = session.metadata || {};
      console.log('Metadata de la sesión:', { userId, serviceId });

      if (userId && serviceId) {
        try {
          const serviceData = {
            username: userId,
            servicio: serviceId,
            createdAt: new Date(),
            estado: 'activo'
          };

          // Si es una suscripción, añadir los campos adicionales
          if (session.mode === 'subscription' && session.subscription) {
            Object.assign(serviceData, {
              subscriptionId: session.subscription.id,
              currentPeriodEnd: new Date(session.subscription.current_period_end * 1000),
              cancelAtPeriodEnd: false,
              stripeStatus: session.subscription.status
            });
          }

          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
          const registerResponse = await fetch(`${baseUrl}/api/user/services`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
          });

          if (!registerResponse.ok) {
            const registerResult = await registerResponse.json();
            throw new Error(registerResult.error || 'Error al registrar el servicio');
          }
        } catch (error) {
          console.error('Error detallado al registrar servicio:', error);
          throw error;
        }
      }
    }

    return NextResponse.json({
      success: session.payment_status === 'paid',
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      mode: session.mode
    });
  } catch (error) {
    console.error('Error completo en verify-payment:', error);
    return NextResponse.json(
      { error: error.message || 'Error al verificar el pago' },
      { status: 500 }
    );
  }
}