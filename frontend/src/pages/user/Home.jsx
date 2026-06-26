import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addingToCart, setAddingToCart] = useState(null); // Track which item is being added

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (value) => {
    setSearch(value);
    try {
      if (!value) {
        fetchProducts();
        return;
      }
      const res = await api.get(`/products/search?q=${value}`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      setAddingToCart(productId);
      await api.post("/cart/add", {
        productId,
        quantity: 1,
      });
      alert("Added To Cart successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              MediCure Store
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Find and order your essential medicines.
            </p>
          </div>

<div className="flex flex-wrap items-center gap-3">

  {/* User Login */}
  <Link to="/login">
    <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition">
      User Login
    </button>
  </Link>

  {/* User Register */}
  <Link to="/register">
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Register
    </button>
  </Link>

  {/* Chemist Login */}
  <Link to="/chemist/login">
    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
      Chemist Login
    </button>
  </Link>

  {/* Chemist Register */}
  <Link to="/chemist/register">
    <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition">
      Chemist Register
    </button>
  </Link>

  {/* Delivery Login */}
  <Link to="/delivery/login">
    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
      Delivery Login
    </button>
  </Link>

  {/* Admin Login */}
  <Link to="/admin/login">
    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
      Admin Login
    </button>
  </Link>

  {/* View Cart */}
  <Link to="/cart">
    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
      🛒
      <span className="hidden sm:inline">
        View Cart
      </span>
    </button>
  </Link>

</div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-4 text-lg font-medium text-slate-900">No products found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="h-48 bg-slate-100 p-6 flex items-center justify-center relative overflow-hidden">
                  {product.image ? (
                    <img
                      src={`http://localhost:3000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-4xl text-slate-300">💊</span>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-md">
                      Only {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center text-red-600 font-bold text-lg">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col flex-grow border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 truncate" title={product.name}>
                    {product.name}
                  </h3>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-blue-600">
                      ₹{product.price}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Stock: {product.stock}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-5 grid grid-cols-2 gap-3">
                    <Link to={`/product/${product._id}`} className="w-full">
                      <button className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-sm">
                        Details
                      </button>
                    </Link>
                    
                    <button
                      onClick={() => addToCart(product._id)}
                      disabled={product.stock === 0 || addingToCart === product._id}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg transition-colors text-sm flex justify-center items-center"
                    >
                      {addingToCart === product._id ? "Adding..." : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}