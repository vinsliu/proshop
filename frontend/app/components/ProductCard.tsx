import Link from "next/link";
import Rating from "./Rating";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-3 transition hover:shadow-md"
    >
      <div className="h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 pb-1">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <div className="mt-auto flex items-center justify-between gap-4">
          <Rating value={product.rating} text={`${product.numReviews} avis`} />

          <p className="shrink-0 text-xl font-bold text-gray-900">
            {product.price.toFixed(2)} €
          </p>
        </div>
      </div>
    </Link>
  );
}
