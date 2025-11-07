import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-3 shadow rounded-lg">
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">₹{item.price * item.qty}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-lg font-bold">Total: ₹{total}</h2>
            <Link
              to="/checkout"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              <ShoppingBag size={18} />
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
