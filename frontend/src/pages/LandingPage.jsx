import { Link } from "react-router-dom";

export default function LandingPage() {
  const roles = [
    {
      title: "Patient",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      description: "Browse medicines, upload prescriptions, track orders and manage your healthcare.",
      login: "/login",
      register: "/register",
      colorClass: "text-blue-600 bg-blue-50 border-blue-100",
      btnClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    },
    {
      title: "Chemist",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.999 2.999 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.999 2.999 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
      ),
      description: "Manage medicines, inventory, fulfill orders and grow your pharmacy business.",
      login: "/chemist/login",
      register: "/chemist/register",
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
    },
    {
      title: "Delivery Partner",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-5.25a2.25 2.25 0 0 0-2.25 2.25v1.5c0 .136.012.268.034.398m-1.784-1.996-2.25 2.25m0 0L7.5 15m3 3V12m-6-3h12.75c.621 0 1.125.504 1.125 1.125v4.5M3 10.5V6.375c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v4.125" />
        </svg>
      ),
      description: "Accept deliveries, update order statuses and earn with flexible delivery schedules.",
      login: "/delivery/login",
      register: "/delivery/register",
      colorClass: "text-purple-600 bg-purple-50 border-purple-100",
      btnClass: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
    },
    {
      title: "Administrator",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      description: "Monitor platform activities, oversee chemists, and manage delivery operations.",
      login: "/admin/login",
      register: null,
      colorClass: "text-slate-700 bg-slate-100 border-slate-200",
      btnClass: "bg-slate-800 hover:bg-slate-900 focus:ring-slate-800",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-800 text-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300"></span>
                </span>
                Trusted by 50,000+ Customers
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Your Digital <br />
                <span className="text-teal-300">Healthcare Partner</span>
              </h1>

              <p className="mt-6 text-lg lg:text-xl leading-relaxed text-teal-50">
                Buy medicines online, upload prescriptions seamlessly, connect with verified local chemists, and track your deliveries in real-time.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/home">
                  <button className="px-8 py-4 bg-white text-teal-800 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                    Shop Medicines
                  </button>
                </Link>
                <a href="#roles">
                  <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 hover:border-white transition-all duration-200">
                    Explore Portals
                  </button>
                </a>
              </div>
            </div>

            {/* Hero Feature Card */}
            <div className="hidden lg:flex justify-end">
              <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md transform rotate-1 hover:rotate-0 transition-transform duration-300 border border-slate-100">
                <div className="space-y-8">
                  
                  {[
                    { title: "Genuine Medicines", desc: "100% verified pharmacies", icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "text-blue-600 bg-blue-50" },
                    { title: "Fast Delivery", desc: "Live order tracking", icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "text-emerald-600 bg-emerald-50" },
                    { title: "Secure Platform", desc: "End-to-end encryption", icon: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z", color: "text-purple-600 bg-purple-50" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${feature.color}`}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{feature.title}</h3>
                        <p className="text-slate-500 mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ROLE PORTALS ================= */}
      <section id="roles" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose Your Portal
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Select your role to access the appropriate dashboard and tailored features designed specifically for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {roles.map((role) => (
              <div 
                key={role.title} 
                className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${role.colorClass} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                  {role.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {role.title}
                </h3>
                
                <p className="mt-3 text-slate-600 leading-relaxed flex-grow">
                  {role.description}
                </p>

                <div className="mt-8 space-y-3">
                  <Link to={role.login} className="block">
                    <button className={`w-full text-white py-3 px-4 rounded-xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${role.btnClass}`}>
                      Login
                    </button>
                  </Link>

                  {role.register ? (
                    <Link to={role.register} className="block">
                      <button className="w-full bg-white border-2 border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200">
                        Register
                      </button>
                    </Link>
                  ) : (
                    <div className="h-[46px]"></div> /* Placeholder to keep card heights uniform when no register button exists */
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} mediQure. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}