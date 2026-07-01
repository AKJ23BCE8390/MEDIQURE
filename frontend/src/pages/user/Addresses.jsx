import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Addresses() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {

            const res = await api.get("/address");

            setAddresses(res.data || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this address?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(`/address/${id}`);

            fetchAddresses();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete address"
            );
        }
    };

    const setDefault = async (id) => {

        try {

            await api.patch(
                `/address/${id}/default`
            );

            fetchAddresses();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update address"
            );
        }
    };

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading...

            </div>

        );
    }

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-5xl mx-auto py-10 px-4">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">

                            My Addresses

                        </h1>

                        <p className="text-slate-500 mt-1">

                            Manage your delivery addresses

                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/profile/address/new")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                    >

                        + Add Address

                    </button>

                </div>

                {addresses.length === 0 && (

                    <div className="bg-white rounded-2xl p-10 text-center shadow">

                        <h2 className="text-2xl font-semibold">

                            No Address Found

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Add your first delivery address.

                        </p>

                        <button
                            onClick={() =>
                                navigate("/profile/address/new")
                            }
                            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
                        >

                            Add Address

                        </button>

                    </div>

                )}

                <div className="grid gap-6">

                    {addresses.map(address => (

                        <div
                            key={address._id}
                            className="bg-white rounded-2xl shadow p-6"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="font-bold text-xl">

                                        {address.fullName}

                                    </h2>

                                    <p className="mt-2">

                                        {address.house}

                                    </p>

                                    <p>

                                        {address.street}

                                    </p>

                                    <p>

                                        {address.city},
                                        {" "}
                                        {address.state}

                                    </p>

                                    <p>

                                        {address.pincode}

                                    </p>

                                    <p className="mt-2">

                                        📞 {address.phone}

                                    </p>

                                </div>

                                {address.isDefault && (

                                    <span
                                        className="h-fit bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold"
                                    >

                                        Default

                                    </span>

                                )}

                            </div>

                            <div className="flex gap-3 mt-6">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/profile/address/edit/${address._id}`
                                        )
                                    }
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                >

                                    Edit

                                </button>

                                <button
                                    onClick={() =>
                                        deleteAddress(address._id)
                                    }
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >

                                    Delete

                                </button>

                                {!address.isDefault && (

                                    <button
                                        onClick={() =>
                                            setDefault(address._id)
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                    >

                                        Make Default

                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}