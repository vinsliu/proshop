import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { CheckoutProvider } from "./context/CheckoutContext";

export const metadata: Metadata = {
  title: "Proshop",
  description: "E-commerce avec Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <UserProvider>
          <CartProvider>
            <CheckoutProvider>
              <Header />
              <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
                {children}
              </main>
              <Footer />
            </CheckoutProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
