"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import type { SubmitEventHandler } from "react";

export default function CartPage() {
  const router = useRouter();
  const { userInfo } = useUser();

  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panier</h1>

        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="rounded border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Vider le panier
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-4 text-gray-600">Votre panier est vide.</p>
          <Link
            href="/"
            className="inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-black"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQty={updateCartQty}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Résumé</h2>

            <div className="mb-3 flex items-center justify-between">
              <span>Produits</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span>Articles</span>
              <span>{totalItems}</span>
            </div>

            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <span>Total</span>
              <span className="text-xl font-bold">
                {totalPrice.toFixed(2)} €
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (userInfo) {
                  router.push("/shipping");
                } else {
                  router.push("/login?redirect=shipping");
                }
              }}
              className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black"
            >
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
