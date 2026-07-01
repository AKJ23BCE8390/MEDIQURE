import { Link } from "react-router-dom";

export default function Profile() {

    const cards = [

        {
            title: "My Addresses",
            description: "Manage your delivery addresses.",
            icon: "📍",
            link: "/profile/addresses",
            color: "bg-blue-100 text-blue-700"
        },

        {
            title: "My Orders",
            description: "Track and manage your orders.",
            icon: "📦",
            link: "/orders",
            color: "bg-green-100 text-green-700"
        },

        {
            title: "Wishlist",
            description: "View your saved medicines.",
            icon: "❤️",
            link: "/wishlist",
            color: "bg-red-100 text-red-700"
        },

        {
            title: "Notifications",
            description: "View latest notifications.",
            icon: "🔔",
            link: "/notifications",
            color: "bg-yellow-100 text-yellow-700"
        }

    ];

    const logout = () => {

        if (
            window.confirm(
                "Logout?"
            )
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            window.location.href = "/login";

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-6xl mx-auto py-10 px-4">

                <div className="bg-white rounded-3xl shadow p-8">

                    <div className="flex items-center gap-6">

                        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">

                            👤

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold">

                                My Profile

                            </h1>

                            <p className="text-slate-500 mt-1">

                                Manage your MediCure account

                            </p>

                        </div>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    {cards.map(card => (

                        <Link
                            key={card.title}
                            to={card.link}
                        >

                            <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-8">

                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${card.color}`}>

                                    {card.icon}

                                </div>

                                <h2 className="text-xl font-bold mt-5">

                                    {card.title}

                                </h2>

                                <p className="text-slate-500 mt-2">

                                    {card.description}

                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

                <div className="mt-10">

                    <button

                        onClick={logout}

                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl"

                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}