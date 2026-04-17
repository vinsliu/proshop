"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useCheckout } from "../context/CheckoutContext";
import { useUser } from "../context/UserContext";

export default function PlaceOrderPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { shippingAddress, paymentMethod } = useCheckout();
  const { userInfo } = useUser();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=placeorder");
      return;
    }

    if (!shippingAddress.address) {
      router.push("/shipping");
      return;
    }

    if (!paymentMethod) {
      router.push("/payment");
      return;
    }

    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [router, userInfo, shippingAddress, paymentMethod, cartItems]);

  const itemsPrice = Number(totalPrice.toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((itemsPrice * 0.15).toFixed(2));
  const finalTotalPrice = Number(
    (itemsPrice + shippingPrice + taxPrice).toFixed(2),
  );

  const placeOrderHandler = async () => {
    if (!userInfo) return;

    try {
      const data = await createOrder(userInfo.token, {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice: finalTotalPrice,
      });

      clearCart();
      router.push(`/order/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userInfo || cartItems.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Livraison</h2>
            <p>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Paiement</h2>
            <p>{paymentMethod}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Articles</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-3"
                >
                  <span>{item.name}</span>
                  <span>
                    {item.qty} x {item.price.toFixed(2)} € ={" "}
                    {(item.qty * item.price).toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Résumé</h2>

          <div className="mb-3 flex justify-between">
            <span>Articles</span>
            <span>{itemsPrice.toFixed(2)} €</span>
          </div>

          <div className="mb-3 flex justify-between">
            <span>Livraison</span>
            <span>{shippingPrice.toFixed(2)} €</span>
          </div>

          <div className="mb-3 flex justify-between">
            <span>Taxe</span>
            <span>{taxPrice.toFixed(2)} €</span>
          </div>

          <div className="mb-6 flex justify-between border-b border-gray-200 pb-4">
            <span>Total</span>
            <span className="text-xl font-bold">
              {finalTotalPrice.toFixed(2)} €
            </span>
          </div>

          <button
            type="button"
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0}
            className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Passer la commande
          </button>
        </div>
      </div>
    </section>
  );
}
