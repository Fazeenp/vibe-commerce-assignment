import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-semibold hover:text-gray-300">
        ShopEasy
      </Link>

      <div className="relative">
        <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300">
          <ShoppingCart size={24} />
          <span>Cart</span>
        </Link>

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </nav>
  );
}
