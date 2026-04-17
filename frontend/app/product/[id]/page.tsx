import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { getProductById } from "@/app/lib/api";
import type { Product } from "@/app/types/product";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  try {
    const product: Product = await getProductById(id);
    return <ProductDetails product={product} />;
  } catch {
    notFound();
  }
}
