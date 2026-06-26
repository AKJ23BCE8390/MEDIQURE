import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Inventory() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/products/inventory/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
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
        <h2 className="text-lg font-medium text-slate-600">Loading inventory data...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Inventory Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor your current stock levels and product availability.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Total Products Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Total Products
              </h3>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <h2 className="text-4xl font-extrabold text-slate-900">
                {stats.totalProducts}
              </h2>
            </div>
          </div>

          {/* Low Stock Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-orange-300 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Low Stock
              </h3>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <h2 className="text-4xl font-extrabold text-slate-900">
                {stats.lowStock}
              </h2>
            </div>
            {stats.lowStock > 0 && (
              <p className="text-sm text-orange-600 mt-2 font-medium">Items need restocking</p>
            )}
          </div>

          {/* Out of Stock Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-red-300 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Out Of Stock
              </h3>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <h2 className="text-4xl font-extrabold text-slate-900">
                {stats.outOfStock}
              </h2>
            </div>
            {stats.outOfStock > 0 && (
              <p className="text-sm text-red-600 mt-2 font-medium">Immediate action required</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}