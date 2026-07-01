import { useEffect, useState } from "react";
import api from "../../services/api";
import OrderDetail from "./OrderDetail";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  
  // New state to track which order modal is open
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/chemist/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setActionLoading(orderId);
      await api.put(`/chemist/orders/${orderId}/status`, {
        status,
      });
      await fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
      case "Ready For Pickup":
        return "text-emerald-700 bg-emerald-100";
      case "Rejected":
        return "text-red-700 bg-red-100";
      case "Packed":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-slate-700 bg-slate-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-500 font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chemist Orders
          </h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
            {orders.length} Total
          </span>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No orders yet</h3>
            <p className="text-slate-500">Incoming orders will appear here for processing.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Order Details */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-slate-500 font-medium">Current Status:</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    {/* NEW: Button to trigger the modal */}
                    <button 
                      onClick={() => setSelectedOrderId(order._id)}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold underline"
                    >
                      View Order Details
                    </button>
                  </div>

                  {/* Status Update Action */}
                  <div className="flex flex-col sm:items-end mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">
                      Update Order Status
                    </label>
                    <div className="relative">
                      <select
                        disabled={actionLoading === order._id}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        value={order.status}
                        className="block w-full sm:w-48 pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer disabled:opacity-50 transition-colors"
                      >
                        <option value="Placed" disabled>Placed</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Packed">Packed</option>
                        <option value="Ready For Pickup">Ready For Pickup</option>
                      </select>
                      {actionLoading === order._id && (
                        <div className="absolute right-8 top-3">
                          <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NEW: Modal Overlay */}
      {selectedOrderId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                Order #{selectedOrderId.slice(-6).toUpperCase()}
              </h2>
              <button 
                onClick={() => setSelectedOrderId(null)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body with scroll */}
            <div className="overflow-y-auto p-4">
              <OrderDetail id={selectedOrderId} />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}