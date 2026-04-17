"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { totalItems } = useCart();
  const { userInfo, logout } = useUser();

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Proshop
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/cart" className="hover:text-gray-300">
            Panier {totalItems > 0 && `(${totalItems})`}
          </Link>

          {userInfo ? (
            <>
              <Link href="/profile" className="hover:text-gray-300">
                Compte
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hover:text-gray-300"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Connexion
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
