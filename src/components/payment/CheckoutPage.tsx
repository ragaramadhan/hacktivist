"use client";

import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

type CheckoutPageProp = {
  amount: number;
  lawyerId: string;
  date: string;
};

const CheckoutPage = (props: CheckoutPageProp) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const amount = props?.amount;
  const lawyerId = props?.lawyerId;
  const bookDate = props?.date;

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
        setErrorMessage("Failed to initialize payment. Please try again.");
      } finally {
        setIsInitializing(false);
      }
    };

    initializePayment();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // note

    try {
      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded yet.");
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        throw new Error("Card number element not found. Please try again.");
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNumberElement },
      });

      if (error) {
        throw new Error(error.message || "Payment failed. Please try again.");
      }

      // Payment successful
      if (lawyerId == "gaada") {
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subs`, { method: "POST" }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount,
              paymentType: "subscription",
              status: "Success",
            }),
          }),
        ]);
        router.push("/");
        router.refresh();
      } else {
        await Promise.all([
          fetch("/api/roomchats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              participants: [lawyerId],
              bookDate,
            }),
          }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount,
              paymentType: "consultation",
              status: "Success",
            }),
          }),
        ]);
        router.push("/payment-success");
      }
    } catch (err) {
      // setErrorMessage(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: '"Inter", sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "16px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="relative h-full">
      {isInitializing ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading small />
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <h1 className="text-3xl font-bold text-slate-900 mb-10 flex-shrink-0">{lawyerId == "gaada" ? "Berlangganan" : "Jasa Konsultasi"}</h1>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto pr-2">
              <div className="space-y-10">
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-4">Nomor Kartu</label>
                  <div className="border-2 rounded-xl p-5 bg-white focus-within:border-primary transition-colors">
                    <CardNumberElement options={cardStyle} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-base font-semibold text-slate-700 mb-4">Tanggal Kadaluarsa</label>
                    <div className="border-2 rounded-xl p-5 bg-white focus-within:border-primary transition-colors">
                      <CardExpiryElement options={cardStyle} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-slate-700 mb-4">CVC</label>
                    <div className="border-2 rounded-xl p-5 bg-white focus-within:border-primary transition-colors">
                      <CardCvcElement options={cardStyle} />
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && <div className="mt-8 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{errorMessage}</div>}
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`
                        mt-10 w-full bg-primary text-white py-5 px-8 rounded-xl text-lg font-semibold
                        hover:bg-primary/90 transition-all flex-shrink-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${loading ? "animate-pulse" : ""}
                    `}
            >
              {loading ? "Memproses pembayaran..." : "Bayar Sekarang"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
