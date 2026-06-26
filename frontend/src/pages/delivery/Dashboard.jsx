import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Delivery Dashboard
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Manage your routes and track assigned orders.
          </p>
        </div>

        {/* Dashboard Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Assigned Orders Card */}
          <Link to="/delivery/orders" className="text-decoration-none focus:outline-none">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 group">
              
              <div className="p-4 rounded-full mb-4 transition-colors duration-200 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              
              <h2 className="text-lg font-semibold text-slate-900">Assigned Orders</h2>
              <p className="mt-2 text-sm text-slate-500 text-center">
                View active orders, customer locations, and update delivery statuses.
              </p>
              
            </div>
          </Link>

          {/* You can easily add more cards here in the future as your app grows */}

        </div>
      </div>
    </div>
  );
}