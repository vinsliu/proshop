"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/app/lib/api";
import { useUser } from "@/app/context/UserContext";

type Order = {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
};

function StatusBadge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "danger";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
        variant === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {children}
    </span>
  );
}

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { userInfo } = useUser();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
      return;
    }

    const loadOrder = async () => {
      try {
        const { id } = await params;
        const data = await getOrderById(userInfo.token, id);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrder();
  }, [params, router, userInfo]);

  if (!order) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Commande {order._id.slice(-8)}
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Livraison</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Nom :</span>{" "}
                {order.user.name}
              </p>
              <p>
                <span className="font-medium text-gray-900">Email :</span>{" "}
                {order.user.email}
              </p>
              <p>
                <span className="font-medium text-gray-900">Adresse :</span>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>

            <div className="mt-4">
              {order.isDelivered ? (
                <StatusBadge variant="success">
                  Livré
                  {order.deliveredAt
                    ? ` le ${new Date(order.deliveredAt).toLocaleDateString(
                        "fr-FR",
                      )}`
                    : ""}
                </StatusBadge>
              ) : (
                <StatusBadge variant="danger">Non livré</StatusBadge>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Paiement</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Méthode :</span>{" "}
                {order.paymentMethod}
              </p>
            </div>

            <div className="mt-4">
              {order.isPaid ? (
                <StatusBadge variant="success">
                  Payé
                  {order.paidAt
                    ? ` le ${new Date(order.paidAt).toLocaleDateString("fr-FR")}`
                    : ""}
                </StatusBadge>
              ) : (
                <StatusBadge variant="danger">Non payé</StatusBadge>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Articles</h2>

            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="grid items-center gap-4 border-b border-gray-200 pb-4 sm:grid-cols-[80px_1fr_auto]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded object-cover"
                  />

                  <div>
                    <Link
                      href={`/product/${item.product}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-1 text-sm text-gray-600">
                      {item.qty} x {item.price.toFixed(2)} €
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    {(item.qty * item.price).toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Résumé</h2>

          <div className="mb-3 flex justify-between">
            <span>Articles</span>
            <span>{order.itemsPrice.toFixed(2)} €</span>
          </div>

          <div className="mb-3 flex justify-between">
            <span>Livraison</span>
            <span>{order.shippingPrice.toFixed(2)} €</span>
          </div>

          <div className="mb-3 flex justify-between">
            <span>Taxe</span>
            <span>{order.taxPrice.toFixed(2)} €</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-4">
            <span>Total</span>
            <span className="text-xl font-bold">
              {order.totalPrice.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
