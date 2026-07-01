import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const roleLinks = {
    user: [
      { name: "Home", path: "/home" },
      { name: "Cart", path: "/cart" },
      { name: "Orders", path: "/orders" },
      { name: "Profile", path: "/profile"}
    ],
    chemist: [
      { name: "Dashboard", path: "/chemist" },
      { name: "Products", path: "/chemist/products" },
      { name: "Orders", path: "/chemist/orders" },
      { name: "Add Product", path: "/chemist/add-product" },
      { name: "Inventory", path: "/chemist/inventory" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Chemists", path: "/admin/chemists" },
      { name: "Orders", path: "/admin/orders" },
      { name: "Stats", path: "/admin/stats" },
      { name: "Analytics", path: "/chemist/analytics" }, 
      { name: "Expiry", path: "/chemist/expiry" },      
    ],
    deliveryBoy: [
      { name: "Dashboard", path: "/delivery" },
      { name: "Orders", path: "/delivery/orders" },
    ],
  };

  const currentLinks = role ? roleLinks[role] : [];
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* ================= LOGO ================= */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
                medi<span className="text-teal-600 dark:text-teal-400">Qure</span>
              </span>
            </Link>
          </div>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            
            {/* Dynamic Role Links */}
            <div className="flex items-center gap-1 mr-4">
              {currentLinks?.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions (Theme, Notifications & Auth) */}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
              
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-400 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {token && (
                <Link
                  to="/notifications"
                  className="p-2 text-slate-400 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 relative"
                  title="Notifications"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                </Link>
              )}

              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors px-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 px-4 py-2 rounded-full transition-all duration-200"
                >
                  Log out
                </button>
              )}
            </div>
          </div>

          {/* ================= MOBILE MENU BUTTONS ================= */}
          <div className="flex lg:hidden items-center gap-3">
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {token && (
              <Link to="/notifications" className="text-slate-400 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </Link>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none p-2 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NAVIGATION MENU ================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-lg absolute w-full transition-colors duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {currentLinks?.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-teal-600 dark:bg-teal-500 rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 shadow-sm transition-colors"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}