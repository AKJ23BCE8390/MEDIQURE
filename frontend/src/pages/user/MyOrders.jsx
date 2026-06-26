import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s === "delivered") return "bg-emerald-100 text-emerald-700";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    if (s === "processing" || s === "shipped") return "bg-blue-100 text-blue-700";
    return "bg-amber-100 text-amber-700";
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
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Orders
          </h1>
          <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Continue Shopping &rarr;
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
            <p className="text-slate-500 mb-6">You haven't placed any orders yet.</p>
            <Link to="/">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex inline-flex items-center w-fit ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-2xl font-extrabold text-slate-900">₹{order.totalAmount}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Payment Method</p>
                    <p className="text-lg font-bold text-slate-700">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex justify-end pt-2">
                  <Link to={`/track/${order._id}`}>
                    <button className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2">
                      Track Order
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
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