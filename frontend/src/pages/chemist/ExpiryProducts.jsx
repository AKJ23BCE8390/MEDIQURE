import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ExpiryProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/expiry");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-lg font-medium text-slate-600">Loading expiry data...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Expiring Medicines
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Inventory items approaching their expiration date.
            </p>
          </div>
        </div>

        {/* Content */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-emerald-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900">All Good!</h3>
            <p className="text-slate-500 mt-1">No medicines are expiring soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const expiry = new Date(product.expiryDate);
              const today = new Date();
              const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
              
              const isCritical = daysLeft <= 7;
              const isExpired = daysLeft < 0;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      isExpired 
                        ? "bg-slate-100 text-slate-600" 
                        : isCritical
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {isExpired 
                      ? "Expired" 
                      : `${daysLeft} days left`}
                  </span>

                  <div className="pr-20">
                    <h3 className="text-lg font-bold text-slate-900 truncate" title={product.name}>
                      {product.name}
                    </h3>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="font-medium w-16">Brand:</span>
                        <span className="text-slate-900 truncate">{product.brand || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="font-medium w-16">Stock:</span>
                        <span className="text-slate-900">{product.stock} units</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="font-medium w-16">Expiry:</span>
                        <span className="text-slate-900">{expiry.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}