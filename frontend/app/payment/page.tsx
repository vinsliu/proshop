"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/CheckoutContext";
import { useUser } from "../context/UserContext";
import type { SubmitEventHandler } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { userInfo } = useUser();
  const { paymentMethod, savePaymentMethod, shippingAddress } = useCheckout();
  const [method, setMethod] = useState(paymentMethod);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=payment");
      return;
    }

    if (!shippingAddress.address) {
      router.push("/shipping");
    }
  }, [router, userInfo, shippingAddress]);

  const submitHandler: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    router.push("/placeorder");
  };

  if (!userInfo) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Méthode de paiement
        </h1>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="rounded border border-gray-200 p-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={method === "PayPal"}
                onChange={(e) => setMethod(e.target.value)}
              />
              <span>PayPal ou Carte bancaire</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black"
          >
            Continuer
          </button>
        </form>
      </div>
    </section>
  );
}
