

import { CreditCard } from "lucide-react";
import { useState } from "react";

export default function Checkout({ cart, clearCart }) {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.target).entries());
    const cartItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
    }));

    try {
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          cartItems,
        }),
      });

      const result = await res.json();
      setReceipt(result);
      clearCart();
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl text-center border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          ✅ Order Confirmed!
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Total:</strong> ₹{receipt.total.toLocaleString()}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A confirmation email has been sent to <b>{receipt.email}</b>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
        Checkout
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-green-200 outline-none"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-green-200 outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition disabled:opacity-60"
        >
          <CreditCard size={18} />
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
}
