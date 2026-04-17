export const API_URL = "http://localhost:9000";

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer les produits");
  }

  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer le produit");
  }

  return res.json();
}

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors de l'inscription");
  }

  return data;
}

export async function loginUser(userData: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors de la connexion");
  }

  return data;
}

export async function getUserProfile(token: string) {
  const res = await fetch(`${API_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible de récupérer le profil");
  }

  return data;
}

export async function updateUserProfile(
  token: string,
  userData: { name: string; email: string; password?: string },
) {
  const res = await fetch(`${API_URL}/api/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible de mettre à jour le profil");
  }

  return data;
}

export async function createOrder(
  token: string,
  orderData: {
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
  },
) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible de créer la commande");
  }

  return data;
}

export async function getOrderById(token: string, id: string) {
  const res = await fetch(`${API_URL}/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible de récupérer la commande");
  }

  return data;
}

export async function getMyOrders(token: string) {
  const res = await fetch(`${API_URL}/api/orders/myorders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Impossible de récupérer les commandes");
  }

  return data;
}
