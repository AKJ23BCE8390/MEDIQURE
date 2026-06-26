import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Tracks which order is being updated

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/delivery/orders");
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
      await api.put(`/delivery/orders/${orderId}/status`, {
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

  const collectCash = async (orderId) => {
    try {
      setActionLoading(`cash-${orderId}`);
      await api.put(`/delivery/orders/${orderId}/collect-cash`);
      alert("Cash Collected Successfully");
      await fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to collect cash");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Out For Delivery":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-500 font-medium">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assigned Orders
          </h1>
          <span className="bg-slate-900 text-white text-sm font-bold px-3 py-1 rounded-full">
            {orders.length} Orders
          </span>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <span className="text-4xl block mb-4">🚚</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No pending deliveries</h3>
            <p className="text-slate-500">You have no active orders assigned right now.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Amount</p>
                    <p className="text-xl font-extrabold text-slate-900">₹{order.totalAmount}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Payment</p>
                    <p className="text-lg font-bold text-slate-700">{order.paymentMethod}</p>
                    {order.paymentMethod === "COD" && (
                      <span className={`text-xs font-bold ${order.paymentStatus === "Paid" ? "text-emerald-600" : "text-red-500"}`}>
                        ({order.paymentStatus || "Pending"})
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  
                  {/* Start Delivery Button (Hide if already delivered) */}
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => updateStatus(order._id, "Out For Delivery")}
                      disabled={order.status === "Out For Delivery" || actionLoading === order._id}
                      className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed text-sm"
                    >
                      {actionLoading === order._id ? "Updating..." : "Start Delivery"}
                    </button>
                  )}

                  {/* Mark Delivered Button */}
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      disabled={actionLoading === order._id}
                      className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {/* Collect Cash Button */}
                  {order.paymentMethod === "COD" && order.paymentStatus !== "Paid" && (
                    <button
                      onClick={() => collectCash(order._id)}
                      disabled={actionLoading === `cash-${order._id}`}
                      className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                    >
                      <span>💵</span>
                      {actionLoading === `cash-${order._id}` ? "Processing..." : "Collect Cash"}
                    </button>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}