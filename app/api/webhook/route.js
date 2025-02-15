import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import UserService from '../../../models/UserService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(JSON.stringify({ error: `Webhook Error: ${err.message}` }), { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);

          await UserService.create({
            username: session.metadata.userId,
            servicio: session.metadata.serviceId,
            createdAt: new Date(),
            estado: 'activo',
            subscriptionId: session.subscription,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: false,
            stripeStatus: subscription.status
          });
        }
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        await UserService.updateOne(
          { subscriptionId: updatedSubscription.id },
          {
            $set: {
              currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
              cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
              stripeStatus: updatedSubscription.status
            }
          }
        );
        break;

      case 'customer.subscription.deleted':
        await UserService.updateOne(
          { subscriptionId: event.data.object.id },
          {
            $set: {
              estado: 'cancelado',
              stripeStatus: 'canceled'
            }
          }
        );
        break;
    }

    return new NextResponse(JSON.stringify({ received: true }));
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
