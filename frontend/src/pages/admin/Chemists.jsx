import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Chemists() {
  const [chemists, setChemists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Tracks which chemist ID is being updated

  useEffect(() => {
    fetchChemists();
  }, []);

  const fetchChemists = async () => {
    try {
      const res = await api.get("/admin/chemists/pending");
      setChemists(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const approveChemist = async (id) => {
    try {
      setActionLoading(`approve-${id}`);
      await api.put(`/admin/chemists/${id}/approve`);
      await fetchChemists();
    } catch (error) {
      console.log(error);
      alert("Failed to approve chemist.");
    } finally {
      setActionLoading(null);
    }
  };

  const rejectChemist = async (id) => {
    try {
      setActionLoading(`reject-${id}`);
      await api.put(`/admin/chemists/${id}/reject`);
      await fetchChemists();
    } catch (error) {
      console.log(error);
      alert("Failed to reject chemist.");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-500 font-medium">Loading pending applications...</p>
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
              Pending Chemists
            </h1>
            <p className="text-sm text-slate-500 mt-1">Review and approve new pharmacy registrations.</p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full w-fit">
            {chemists.length} Pending
          </span>
        </div>

        {/* Empty State */}
        {chemists.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">All caught up!</h3>
            <p className="text-slate-500">There are no pending chemist approvals at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {chemists.map((chemist) => (
              <div
                key={chemist._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="bg-slate-900 px-5 py-4 flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-xl shrink-0">
                    🏪
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white truncate" title={chemist.shopName}>
                      {chemist.shopName}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Owner Name</p>
                    <p className="text-slate-900 font-semibold">{chemist.ownerName}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Contact Info</p>
                    <p className="text-slate-700 text-sm mb-1 break-all">📧 {chemist.email}</p>
                    {/* Assuming you have mobile in your data from previous components */}
                    {chemist.mobile && <p className="text-slate-700 text-sm">📱 {chemist.mobile}</p>}
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
                      {chemist.approvalStatus}
                    </span>
                  </div>
                </div>

                {/* Card Footer / Actions */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => rejectChemist(chemist._id)}
                    disabled={actionLoading !== null}
                    className="w-full py-2.5 px-4 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors text-sm disabled:opacity-50"
                  >
                    {actionLoading === `reject-${chemist._id}` ? "Rejecting..." : "Reject"}
                  </button>
                  
                  <button
                    onClick={() => approveChemist(chemist._id)}
                    disabled={actionLoading !== null}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm disabled:opacity-50"
                  >
                    {actionLoading === `approve-${chemist._id}` ? "Approving..." : "Approve"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}