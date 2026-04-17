"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type CheckoutContextType = {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  saveShippingAddress: (data: ShippingAddress) => void;
  savePaymentMethod: (method: string) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    const storedShippingAddress = localStorage.getItem("shippingAddress");
    const storedPaymentMethod = localStorage.getItem("paymentMethod");

    if (storedShippingAddress) {
      setShippingAddress(JSON.parse(storedShippingAddress));
    }

    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
    }
  }, []);

  const saveShippingAddress = (data: ShippingAddress) => {
    setShippingAddress(data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

  const savePaymentMethod = (method: string) => {
    setPaymentMethod(method);
    localStorage.setItem("paymentMethod", method);
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        paymentMethod,
        saveShippingAddress,
        savePaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return context;
}
