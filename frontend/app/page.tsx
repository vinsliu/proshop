import ProductCard from "./components/ProductCard";
import { getProducts } from "./lib/api";
import type { Product } from "./types/product";

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Derniers produits</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
