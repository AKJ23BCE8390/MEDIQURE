import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders/recent");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Out For Delivery":
        return "bg-blue-100 text-blue-700";
      case "Packed":
      case "Ready For Pickup":
        return "bg-purple-100 text-purple-700";
      case "Rejected":
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recent Orders
            </h1>
            <p className="text-sm text-slate-500 mt-1">Track and assign platform orders.</p>
          </div>
          <span className="bg-slate-900 text-white text-sm font-bold px-4 py-1.5 rounded-full w-fit">
            {orders.length} Total
          </span>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No orders found</h3>
            <p className="text-slate-500">There are no recent orders in the system.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="border-b border-slate-100 px-5 py-4 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-lg font-bold text-slate-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Amount</p>
                      <p className="text-xl font-extrabold text-slate-900">₹{order.totalAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Payment</p>
                      <p className="text-slate-700 font-semibold">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-50">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Delivery Partner</p>
                    <p className={`text-sm font-medium ${order.deliveryBoyId ? "text-blue-600" : "text-amber-600"}`}>
                      {order.deliveryBoyId || "Not Assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Order Date</p>
                    <p className="text-sm text-slate-600">
                      {new Date(order.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                </div>

                {/* Card Footer / Actions */}
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  <Link to={`/admin/orders/${order._id}/assign`} className="block">
                    <button className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      {order.deliveryBoyId ? "Reassign Delivery" : "Assign Delivery Boy"}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}