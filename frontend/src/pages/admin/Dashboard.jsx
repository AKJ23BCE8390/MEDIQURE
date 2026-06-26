import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const dashboardCards = [
    {
      to: "/admin/chemists",
      title: "Manage Chemists",
      description: "Review, approve, and manage pharmacy partners.",
      icon: "🏪",
      color: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white"
    },
    {
      to: "/admin/orders",
      title: "View Orders",
      description: "Monitor all platform orders and track statuses.",
      icon: "📦",
      color: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white"
    },
    {
      to: "/admin/users",
      title: "Users",
      description: "Manage customer accounts and access levels.",
      icon: "👥",
      color: "text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white"
    },
    {
      to: "/admin/delivery-boys",
      title: "Delivery Boys",
      description: "Manage delivery fleet, availability, and assignments.",
      icon: "🛵",
      color: "text-amber-600 bg-amber-50 group-hover:bg-amber-600 group-hover:text-white"
    },
    {
      to: "/admin/stats",
      title: "Statistics",
      description: "View revenue, platform growth, and analytics.",
      icon: "📊",
      color: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            System overview and platform management modules.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardCards.map((card) => (
            <Link key={card.to} to={card.to} className="block focus:outline-none">
              <div className="h-full flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group">
                
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors duration-300 ${card.color}`}>
                  {card.icon}
                </div>
                
                {/* Text Content */}
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {card.title}
                </h2>
                <p className="text-sm text-slate-500 flex-grow leading-relaxed">
                  {card.description}
                </p>

                {/* Arrow Indicator */}
                <div className="mt-4 flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                  Go to module <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
                
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}