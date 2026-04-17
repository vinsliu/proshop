"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/CheckoutContext";
import { useUser } from "../context/UserContext";
import type { SubmitEventHandler } from "react";

export default function ShippingPage() {
  const router = useRouter();
  const { userInfo } = useUser();
  const { shippingAddress, saveShippingAddress } = useCheckout();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=shipping");
    }
  }, [router, userInfo]);

  const submitHandler: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    saveShippingAddress({
      address,
      city,
      postalCode,
      country,
    });

    router.push("/payment");
  };

  if (!userInfo) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Adresse de livraison
        </h1>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ville
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Code postal
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Pays
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            />
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
