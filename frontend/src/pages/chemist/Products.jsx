import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/my-products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Products
            </h1>
            <p className="text-sm text-slate-500 mt-1">Manage your store's inventory</p>
          </div>
          <Link to="/chemist/add-product">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </Link>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
            <p className="text-slate-500">You haven't added any products to your inventory yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="h-48 bg-slate-100 p-4 relative flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
/>
                  ) : (
                    <span className="text-4xl text-slate-300">💊</span>
                  )}
                  
                  {/* Stock Badges */}
                  {product.stock === 0 ? (
                    <span className="absolute top-3 right-3 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                      Out of Stock
                    </span>
                  ) : product.stock <= 10 ? (
                    <span className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                      Low Stock
                    </span>
                  ) : null}
                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 truncate" title={product.name}>
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1 mb-4">
                    {product.category || "Uncategorized"}
                  </p>
                  
                  <div className="flex items-end justify-between mb-4">
                    <p className="text-2xl font-extrabold text-blue-600">₹{product.price}</p>
                    <p className="text-sm font-medium text-slate-600">
                      Stock: <span className="font-bold text-slate-900">{product.stock}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                    <Link to={`/chemist/edit-product/${product._id}`} className="w-full">
                      <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-sm">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors text-sm"
                    >
                      Delete
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