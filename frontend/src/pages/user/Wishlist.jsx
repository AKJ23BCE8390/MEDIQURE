import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Wishlist() {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchWishlist();

    }, []);

    const fetchWishlist = async () => {

        try {

            const res = await api.get("/wishlist");

            setWishlist(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const removeWishlist = async (id) => {

        try {

            await api.delete(`/wishlist/${id}`);

            fetchWishlist();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to remove wishlist item"
            );

        }

    };

    const addToCart = async (productId) => {

        try {

            await api.post("/cart/add", {

                productId,

                quantity: 1

            });

            alert("Added to cart");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to add to cart"
            );

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-xl font-semibold">

                    Loading Wishlist...

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto py-10 px-4">

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-4xl font-bold">

                            ❤️ My Wishlist

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Save medicines for later.

                        </p>

                    </div>

                    <div className="text-lg font-semibold">

                        {wishlist.length} Items

                    </div>

                </div>
                                {wishlist.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow p-16 text-center">

                        <div className="text-7xl">

                            ❤️

                        </div>

                        <h2 className="text-3xl font-bold mt-6">

                            Your Wishlist is Empty

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Save medicines to purchase them later.

                        </p>

                        <Link
                            to="/home"
                            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                        >

                            Browse Medicines

                        </Link>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {wishlist.map(item => {

                            const product = item.product;

                            return (

                                <div
                                    key={item._id}
                                    className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
                                >

                                    <div className="h-56 bg-slate-100 flex items-center justify-center">

                                        {product.image ? (

                                            <img
                                                src={`${import.meta.env.VITE_API_URL.replace("/api","")}${product.image}`}
                                                alt={product.name}
                                                className="h-48 object-contain"
                                            />

                                        ) : (

                                            <div className="text-7xl">

                                                💊

                                            </div>

                                        )}

                                    </div>

                                    <div className="p-6">

                                        <h2 className="text-xl font-bold">

                                            {product.name}

                                        </h2>

                                        <p className="text-slate-500 mt-2">

                                            {product.company}

                                        </p>

                                        <div className="flex justify-between items-center mt-5">

                                            <div>

                                                <div className="text-2xl font-bold text-blue-600">

                                                    ₹{product.price}

                                                </div>

                                                <div className="text-sm text-slate-500">

                                                    Stock: {product.stock}

                                                </div>

                                            </div>

                                            <div className="text-yellow-500 font-semibold">

                                                ⭐ {product.averageRating || "4.5"}

                                            </div>

                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-6">

                                            <button
                                                onClick={() => addToCart(product._id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                                            >

                                                🛒 Add

                                            </button>

                                            <button
                                                onClick={() => removeWishlist(item._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                                            >

                                                Remove

                                            </button>

                                        </div>

                                        <Link
                                            to={`/product/${product._id}`}
                                        >

                                            <button
                                                className="w-full mt-4 border border-slate-300 hover:bg-slate-100 py-3 rounded-xl"
                                            >

                                                View Details

                                            </button>

                                        </Link>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}
                            </div>

        </div>

    );

}