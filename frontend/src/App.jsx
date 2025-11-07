import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const addToCart = async (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === product.id);
      if (existing) {
        return prev.map((p) =>
          p.productId === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, qty: 1 }];
    });

    try {
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, qty: 1 }),
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };
  const updateQty = async (id, qty) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id || p.productId === id ? { ...p, qty } : p
        )
        .filter((p) => p.qty > 0)
    );

    try {
      if (qty <= 0) {
        await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
      } else {
        await fetch(`http://localhost:5000/api/cart/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qty }),
        });
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id && p.productId !== id));
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearCart = async () => {
    setCart([]);
    try {
      await fetch("http://localhost:5000/api/cart/clear", { method: "DELETE" });
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} cart={cart} updateQty={updateQty} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
