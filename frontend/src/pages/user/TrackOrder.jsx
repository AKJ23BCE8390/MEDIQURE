import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import OrderTracking from "../../components/OrderTracking";

export default function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-700">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link to="/orders" className="text-blue-600 hover:underline">
          Return to My Orders
        </Link>
      </div>
    );
  }

  const statuses = [
    "Placed",
    "Accepted",
    "Packed",
    "Ready For Pickup",
    "Out For Delivery",
    "Delivered"
  ];

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header & Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Track Order
            </h1>
            <p className="text-slate-500 mt-1">
              Order #{order._id.slice(-6).toUpperCase()}
            </p>
          </div>
          <Link to="/orders" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            &larr; Back to Orders
          </Link>
        </div>

        {/* Status Timeline Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <h2 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
            Delivery Status: <span className="text-blue-600">{order.status}</span>
          </h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200" aria-hidden="true"></div>

            <ul className="space-y-6">
              {statuses.map((status, index) => {
                const isCompleted = index < currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                const isPending = index > currentStatusIndex;

                return (
                  <li key={status} className="relative flex items-center gap-6">
                    {/* Circle Indicator */}
                    <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
                      {isCompleted ? (
                        <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-white z-10">
                          <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : isCurrent ? (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-white z-10 shadow-md">
                          <div className="h-3 w-3 rounded-full bg-white animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center ring-4 ring-white z-10"></div>
                      )}
                    </span>

                    {/* Text Details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className={`text-sm font-semibold ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                        {status}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-slate-500 mt-0.5">
                          This is the current status of your order.
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Live Tracking Map Section */}
        {order.status === "Out For Delivery" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-6">
            <div className="bg-slate-900 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Live Delivery Tracking
              </h2>
            </div>
            <div className="p-0 sm:p-4 bg-slate-50">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner min-h-[300px] bg-white">
                <OrderTracking orderId={order._id} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}