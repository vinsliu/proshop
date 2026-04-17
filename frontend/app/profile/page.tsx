"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SubmitEventHandler } from "react";
import { getMyOrders, getUserProfile, updateUserProfile } from "../lib/api";
import { useUser } from "../context/UserContext";

type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const profileData = await getUserProfile(userInfo.token);
        setName(profileData.name);
        setEmail(profileData.email);

        const ordersData = await getMyOrders(userInfo.token);
        setOrders(ordersData);
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        }
      }
    };

    loadData();
  }, [router, userInfo]);

  const submitHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessMessage("");

    if (password && password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    if (!userInfo) {
      setMessage("Utilisateur non connecté");
      return;
    }

    try {
      const data = await updateUserProfile(userInfo.token, {
        name,
        email,
        password: password || undefined,
      });

      setUserInfo(data);
      setSuccessMessage("Profil mis à jour avec succès");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              Mon compte
            </h1>

            {message && (
              <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
                {message}
              </p>
            )}

            {successMessage && (
              <p className="mb-4 rounded bg-green-100 px-3 py-2 text-sm text-green-700">
                {successMessage}
              </p>
            )}

            <form className="space-y-4" onSubmit={submitHandler}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Mes commandes
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-600">Aucune commande pour le moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        ID
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        Payé
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        Livré
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-100">
                        <td className="px-4 py-3">{order._id.slice(-6)}</td>
                        <td className="px-4 py-3">
                          {new Date(order.createdAt).toLocaleDateString(
                            "fr-FR",
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {order.totalPrice.toFixed(2)} €
                        </td>
                        <td className="px-4 py-3">
                          {order.isPaid ? (
                            <span className="text-green-600">Oui</span>
                          ) : (
                            <span className="text-red-600">Non</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {order.isDelivered ? (
                            <span className="text-green-600">Oui</span>
                          ) : (
                            <span className="text-red-600">Non</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => router.push(`/order/${order._id}`)}
                            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
