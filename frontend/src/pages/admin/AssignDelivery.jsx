import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AssignDelivery() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedBoy, setSelectedBoy] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const res = await api.get("/admin/delivery-boys?available=true");
      setDeliveryBoys(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const assignDelivery = async () => {
    if (!selectedBoy) {
      alert("Please select a delivery partner first.");
      return;
    }

    try {
      setAssigning(true);
      await api.put(`/admin/orders/${orderId}/assign`, {
        deliveryBoyId: selectedBoy,
      });

      alert("Delivery Boy Assigned Successfully!");
      navigate(-1); // Navigate back to the orders list
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Assignment Failed");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-500 font-medium">Finding available drivers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"
        >
          <span>&larr;</span> Back to Orders
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="bg-slate-900 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛵</span>
              <div>
                <h1 className="text-xl font-bold text-white">Assign Delivery</h1>
                <p className="text-slate-400 text-sm mt-0.5">Order #{orderId.slice(-6).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {deliveryBoys.length === 0 ? (
              <div className="text-center py-6">
                <div className="mx-auto h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No Drivers Available</h3>
                <p className="text-sm text-slate-500 mt-1">
                  All delivery personnel are currently busy. Please try again later.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="driver" className="block text-sm font-medium text-slate-700 mb-2">
                    Select Available Driver
                  </label>
                  <select
                    id="driver"
                    value={selectedBoy}
                    onChange={(e) => setSelectedBoy(e.target.value)}
                    className="block w-full pl-3 pr-10 py-3 text-base border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm rounded-lg bg-slate-50 transition-all cursor-pointer"
                  >
                    <option value="" disabled>
                      -- Select Delivery Partner --
                    </option>
                    {deliveryBoys.map((boy) => (
                      <option key={boy._id} value={boy._id}>
                        {boy.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={assignDelivery}
                    disabled={!selectedBoy || assigning}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {assigning ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Assigning...
                      </span>
                    ) : (
                      "Confirm Assignment"
                    )}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}