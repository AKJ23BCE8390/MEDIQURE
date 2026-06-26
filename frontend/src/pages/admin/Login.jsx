import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Branding / Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 shadow-md">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access the system dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-white py-8 px-4 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={submit}>
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@medicure.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyles}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyles}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Secure Login"
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}