import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("dot env gak ada");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "idr",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      {
        status: 200,
        // message: "Success pembayaran konsultasi",
      }
    );
  } catch (error) {
    console.error("Internal Error:", error);

    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
