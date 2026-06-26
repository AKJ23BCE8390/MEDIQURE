import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Checkout() {
  // TODO: Replace this mock total with your actual cart total (from context, props, or state)
  const [cart, setCart] =
    useState(null);

const [total, setTotal] =
    useState(0);

  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(total);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    fetchAddresses();
    fetchCart();
}, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/address");
      setAddresses(res.data);
      if (res.data.length > 0) {
        setSelectedAddress(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCart =
    async () => {
        try {

            const res =
                await api.get(
                    "/cart"
                );

            setCart(
                res.data
            );

            const cartTotal =
                res.data.items?.reduce(
                    (
                        sum,
                        item
                    ) =>
                        sum +
                        (
                            item.price *
                            item.quantity
                        ),
                    0
                ) || 0;

            setTotal(
                cartTotal
            );

            setFinalAmount(
                cartTotal
            );

        } catch (error) {

            console.log(error);
        }
    };

  const applyCoupon = async () => {
    try {
      const res = await api.post("/coupons/validate", {
        code: coupon,
        orderAmount: total,
      });
      setDiscount(res.data.discount);
      setFinalAmount(res.data.finalAmount);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid coupon");
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      await api.post("/orders", {
        addressId: selectedAddress,
        paymentMethod,
        // Include finalAmount/coupon details if your backend requires them
      });
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 sm:px-8 py-5">
          <h1 className="text-2xl font-bold text-white">Checkout</h1>
          <p className="text-slate-400 text-sm mt-1">Complete your order details below.</p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Address Section */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">1. Shipping Address</h3>
            {addresses.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No addresses found. Please add an address first.</p>
            ) : (
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.fullName}, {address.city}
                  </option>
                ))}
              </select>
            )}
          </section>

          {/* Payment Method Section */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">2. Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="ml-3 font-medium text-slate-900">Cash On Delivery (COD)</span>
              </label>
              {/* Add more payment methods here if needed in the future */}
            </div>
          </section>

          {/* Coupon Section */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">3. Promo Code</h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
              />
              <button
                onClick={applyCoupon}
                disabled={!coupon}
                className="px-6 py-2 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 transition-colors"
              >
                Apply
              </button>
            </div>
          </section>

          {/* Order Summary */}
          <section className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
            <div className="bg-slate-50 rounded-lg p-5 space-y-3 border border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>- ₹{discount.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Final Total</span>
                <span className="text-2xl font-extrabold text-slate-900">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={placeOrder}
              disabled={loading || !selectedAddress}
              className="w-full py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}