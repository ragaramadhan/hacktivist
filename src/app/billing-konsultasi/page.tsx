"use client";

import CheckoutPage from "@/components/payment/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function BillingPage() {
  const searchParams = useSearchParams();

  const lawyerId = searchParams.get("lawyer");
  const date = searchParams.get("date");
  const total = searchParams.get("amount");
  const cleanedAmount = total?.replace(/\./g, "");
  const amount = cleanedAmount ? Number(cleanedAmount) : 0;

  if (!lawyerId || !date) return null;

  return (
    <main className="fixed inset-0 bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Amount */}
          <div className="text-center lg:text-left lg:pl-8">
            <h2 className="text-slate-400 text-2xl mb-6">Total Pembayaran:</h2>
            <div className="text-white text-7xl font-bold">
              Rp {amount.toLocaleString()}
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-white rounded-3xl p-12 relative h-[600px]">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "idr",
              }}
            >
              <CheckoutPage amount={amount} lawyerId={lawyerId} date={date} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
}
