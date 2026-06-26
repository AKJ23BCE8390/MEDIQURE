import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function ChemistRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: "",
    ownerName: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/chemist/register", form);
      alert("Chemist Registered Successfully! Please login.");
      navigate("/chemist/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <span className="text-3xl">🏪</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Partner Registration
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Register your pharmacy to start receiving orders online.
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-8 bg-white py-8 px-4 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={register}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Shop Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Shop Name</label>
                <input
                  name="shopName"
                  type="text"
                  required
                  placeholder="e.g., City Pharmacy"
                  value={form.shopName}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Owner Name</label>
                <input
                  name="ownerName"
                  type="text"
                  required
                  placeholder="Full Name"
                  value={form.ownerName}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Mobile Number</label>
                <input
                  name="mobile"
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={form.mobile}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="shop@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Complete Address</label>
              <textarea
                name="address"
                required
                rows="3"
                placeholder="Shop number, street, city..."
                value={form.address}
                onChange={handleChange}
                className={`${inputStyles} resize-none`}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors duration-200"
              >
                {loading ? "Registering..." : "Register Pharmacy"}
              </button>
            </div>
            
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-6">
            Already registered?{" "}
            <Link
              to="/chemist/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in here
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}