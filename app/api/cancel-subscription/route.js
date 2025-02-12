// app/api/cancel-subscription/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Se requiere el ID de suscripción' },
        { status: 400 }
      );
    }

    // Cancelar la suscripción en Stripe
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Actualizar en nuestra base de datos
    await dbConnect();
    const db = mongoose.connection.db;
    await db.collection('user_service').updateOne(
      { subscriptionId: subscriptionId },
      {
        $set: {
          cancelAtPeriodEnd: true,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000)
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Suscripción cancelada correctamente',
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    });
  } catch (error) {
    console.error('Error in cancel-subscription:', error);
    return NextResponse.json(
      { error: error.message || 'Error al cancelar la suscripción' },
      { status: 500 }
    );
  }
}