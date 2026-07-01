import { useEffect, useState } from "react";
import api from "../../services/api";

export default function OrderDetail({ id }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/chemist/order/${id}/detail`);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Order Items</h2>

      <div className="space-y-3">
        {order?.items?.map((item) => (
          <div key={item.productId} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold text-slate-800">{item.name}</h3>
            <div className="flex justify-between text-sm mt-2 text-slate-600">
              <p>Quantity: {item.quantity}</p>
              <p className="font-medium">Price: ₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}