"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Rating from "@/app/components/Rating";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/types/product";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const { addToCart } = useCart();

  const isInStock = product.countInStock > 0;
  const totalPrice = product.price * qty;

  const addToCartHandler = () => {
    addToCart({
      id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    });

    router.push("/cart");
  };

  return (
    <section>
      <Link
        href="/"
        className="mb-6 inline-block rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
      >
        Retour
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-[450px] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="mb-4 border-b border-gray-200 pb-4">
              <Rating
                value={product.rating}
                text={`${product.numReviews} avis`}
              />
            </div>

            <div className="border-b border-gray-200 pb-4">
              <p className="text-2xl font-bold text-gray-900">
                {product.price.toFixed(2)} €
              </p>
            </div>

            <div className="pt-4">
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-700">Statut</span>
                <span
                  className={
                    isInStock
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {isInStock ? "Disponible" : "Indisponible"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-700">Quantité</span>

                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  disabled={!isInStock}
                  className="rounded border border-gray-300 px-3 py-1 text-sm"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-700">Prix</span>
                <span className="text-lg font-bold text-gray-900">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>

              <button
                type="button"
                onClick={addToCartHandler}
                disabled={!isInStock}
                className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
