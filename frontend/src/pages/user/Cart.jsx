import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put("/cart/update", {
        productId,
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Continue Shopping &rarr;
          </Link>
        </div>

        {!cart.items || cart.items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 mb-6">Looks like you haven't added any medicines yet.</p>
            <Link to="/">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Items List */}
            <ul className="divide-y divide-slate-200">
              {cart.items.map((item) => (
                <li key={item.productId} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-slate-50 transition-colors">
                  
                  {/* Image */}
                  <div className="shrink-0 w-24 h-24 bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                    <p className="text-slate-500 mt-1">₹{item.price} per unit</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-slate-600 shadow-sm hover:text-blue-600 transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="w-10 text-center font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-slate-600 shadow-sm hover:text-blue-600 transition-colors"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right sm:w-24">
                    <p className="text-lg font-bold text-slate-900">₹{item.subtotal}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                </li>
              ))}
            </ul>

            {/* Summary Section */}
            <div className="bg-slate-50 p-6 sm:px-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-500 text-sm font-medium">Order Total</p>
                <p className="text-3xl font-extrabold text-slate-900">₹{cart.total}</p>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}