import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import PrescriptionUpload from "../../components/PrescriptionUpload";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addingToCart, setAddingToCart] = useState(null);

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

  const addToWishlist = async (productId) => {
    try {
      await api.post("/wishlist", { productId });
      alert("Added to wishlist");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center transition-colors duration-300">
        <svg className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-500 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
              MediCure Store
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
              Find and order your essential medicines.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => searchProducts(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm transition-colors duration-200 shadow-sm"
              />
            </div>

            {/* View Cart Button */}
            <Link to="/cart" className="shrink-0">
              <button className="flex items-center justify-center px-4 py-2 bg-slate-900 dark:bg-teal-600 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-teal-500 transition-colors shadow-sm gap-2">
                <span>🛒</span>
                <span className="hidden sm:inline">View Cart</span>
              </button>
            </Link>
          </div>
        </div>

        <div>
          <PrescriptionUpload />
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors duration-300 mt-8">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white transition-colors">No products found</h3>
            <p className="mt-1 text-slate-500 dark:text-slate-400 transition-colors">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="h-48 bg-slate-100 dark:bg-slate-700/50 p-6 flex items-center justify-center relative overflow-hidden transition-colors">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-4xl text-slate-300 dark:text-slate-600 transition-colors">💊</span>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded-md transition-colors">
                      Only {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute inset-0 bg-white/60 dark:bg-slate-900/70 backdrop-blur-[1px] flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-lg transition-colors">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col flex-grow border-t border-slate-100 dark:border-slate-700 transition-colors">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate transition-colors" title={product.name}>
                    {product.name}
                  </h3>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 transition-colors">
                      ₹{product.price}
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">
                      Stock: {product.stock}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-5 flex items-center gap-2">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => addToWishlist(product._id)}
                      className="flex-shrink-0 flex items-center justify-center h-[42px] w-[42px] bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-pink-500 dark:text-pink-400 rounded-lg transition-colors border border-pink-100 dark:border-pink-900/30"
                      title="Add to Wishlist"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>

                    {/* Details Button */}
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <button className="w-full h-[42px] px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition-colors text-sm">
                        Details
                      </button>
                    </Link>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product._id)}
                      disabled={product.stock === 0 || addingToCart === product._id}
                      className="flex-1 h-[42px] px-3 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-blue-300 dark:disabled:bg-slate-700 dark:disabled:text-slate-400 text-white font-semibold rounded-lg transition-colors text-sm flex justify-center items-center"
                    >
                      {addingToCart === product._id ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      ) : (
                        "Add"
                      )}
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