import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="  p-4 flex justify-between items-center shadow-md ">
      <Link to="/" className="text-2xl pl-10 font-extrabold text-blue-600 hover:text-gray-300">
        VIBE
      </Link>

      <div className="relative pr-12">
        <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300">
          <ShoppingCart size={24} />
          <span>Cart</span>
        </Link>

        {cartCount > 0 && (
          <span className="absolute -top-2 right-10 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </nav>
  );
}
