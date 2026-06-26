import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Shared style classes for links
  const navLinkClass =
    "text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-900/90 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-decoration-none">
              <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                MediCure
              </h2>
            </Link>
          </div>

          {/* Navigation Links Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {token && (
              <Link
                to="/notifications"
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-full transition-all duration-200"
                title="Notifications"
              >
                <span className="text-lg">🔔</span>
              </Link>
            )}

            {/* User Links */}
            {role === "user" && (
              <>
                <Link to="/cart" className={navLinkClass}>Cart</Link>
                <Link to="/orders" className={navLinkClass}>Orders</Link>
              </>
            )}

            {/* Chemist Links */}
            {role === "chemist" && (
              <>
                <Link to="/chemist" className={navLinkClass}>Dashboard</Link>
                <Link to="/chemist/products" className={navLinkClass}>Products</Link>
                <Link to="/chemist/orders" className={navLinkClass}>Orders</Link>
                <Link to="/chemist/add-product" className={navLinkClass}>Add Product</Link>
                <Link to="/chemist/inventory" className={navLinkClass}>Inventory</Link>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <Link to="/admin" className={navLinkClass}>Dashboard</Link>
                <Link to="/admin/chemists" className={navLinkClass}>Chemists</Link>
                <Link to="/admin/orders" className={navLinkClass}>Orders</Link>
                <Link to="/admin/stats" className={navLinkClass}>Stats</Link>
                <Link to="/chemist/analytics" className={navLinkClass}>Analytics</Link>
                <Link to="/chemist/expiry" className={navLinkClass}>Expiry</Link>
              </>
            )}

            {/* Delivery Boy Links */}
            {role === "deliveryBoy" && (
              <>
                <Link to="/delivery" className={navLinkClass}>Dashboard</Link>
                <Link to="/delivery/orders" className={navLinkClass}>Orders</Link>
              </>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-700">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-blue-500/25"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md transition-all duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}