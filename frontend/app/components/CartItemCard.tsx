"use client";

import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

type CartItemCardProps = {
  item: CartItem;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItemCard({
  item,
  onUpdateQty,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 rounded object-cover"
          />

          <div className="flex flex-col justify-center">
            <Link
              href={`/product/${item.id}`}
              className="font-medium text-gray-900 hover:underline"
            >
              {item.name}
            </Link>

            <p className="mt-2 text-sm text-gray-600">
              {item.price.toFixed(2)} €
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Quantité
              </label>
              <select
                value={item.qty}
                onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-600">Sous-total</p>
              <p className="rounded border border-gray-200 px-3 py-2 font-semibold text-gray-900">
                {(item.price * item.qty).toFixed(2)} €
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="w-full rounded border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden items-center gap-4 md:grid md:grid-cols-[80px_1fr_140px_140px_120px]">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded object-cover"
        />

        <div>
          <Link
            href={`/product/${item.id}`}
            className="font-medium text-gray-900 hover:underline"
          >
            {item.name}
          </Link>

          <p className="mt-2 text-sm text-gray-600">
            {item.price.toFixed(2)} €
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Quantité</label>
          <select
            value={item.qty}
            onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-600">Sous-total</p>
          <p className="font-semibold text-gray-900">
            {(item.price * item.qty).toFixed(2)} €
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="rounded border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
