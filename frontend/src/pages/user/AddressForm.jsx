import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function AddressForm() {

    const navigate = useNavigate();
    const { addressId } = useParams();

    const isEdit = !!addressId;

    const [loading, setLoading] = useState(false);

    const [detecting, setDetecting] = useState(false);

    const [form, setForm] = useState({

        fullName: "",

        phone: "",

        house: "",

        street: "",

        landmark: "",

        city: "",

        state: "",

        pincode: "",

        latitude: "",

        longitude: "",

        addressType: "Home",

        isDefault: false

    });

    useEffect(() => {

        if (isEdit) {

            fetchAddress();

        }

    }, []);

    const fetchAddress = async () => {

        try {

            const res =
                await api.get("/address");

            const address =
                res.data.find(
                    item => item._id === addressId
                );

            if (address) {

                setForm(address);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = e => {

        const { name, value, type, checked } = e.target;

        setForm(prev => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };

    const detectLocation = () => {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported.");

        return;

    }

    setDetecting(true);

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {

                const response = await fetch(

                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

                );

                const data = await response.json();

                const address = data.address || {};

                setForm(prev => ({

                    ...prev,

                    latitude,

                    longitude,

                    house:
                        address.house_number || "",

                    street:
                        address.road || "",

                    landmark:
                        address.suburb ||
                        address.neighbourhood ||
                        "",

                    city:
                        address.city ||
                        address.town ||
                        address.village ||
                        "",

                    state:
                        address.state || "",

                    pincode:
                        address.postcode || ""

                }));

            }

            catch (error) {

                console.log(error);

                alert("Unable to fetch address.");

            }

            setDetecting(false);

        },

        error => {

            console.log(error);

            alert("Location permission denied.");

            setDetecting(false);

        }

    );

};
        const submit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (
                !form.fullName ||
                !form.phone ||
                !form.house ||
                !form.street ||
                !form.city ||
                !form.state ||
                !form.pincode
            ) {

                alert("Please fill all required fields.");

                setLoading(false);

                return;

            }

            if (isEdit) {

                await api.put(

                    `/address/${addressId}`,

                    form

                );

                alert("Address updated successfully.");

            }

            else {

                await api.post(

                    "/address",

                    form

                );

                alert("Address added successfully.");

            }

            navigate("/profile/addresses");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to save address."

            );

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="min-h-screen bg-slate-100 py-10">

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8">

                    {isEdit ?

                        "Edit Address"

                        :

                        "Add New Address"}

                </h1>

                <form

                    onSubmit={submit}

                    className="space-y-6"

                >                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block font-medium mb-2">
                                Full Name *
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Phone Number *
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                required
                            />
                        </div>

                    </div>

                    <div>

                        <label className="block font-medium mb-2">

                            House / Flat No *

                        </label>

                        <input
                            type="text"
                            name="house"
                            value={form.house}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="block font-medium mb-2">

                            Street *

                        </label>

                        <input
                            type="text"
                            name="street"
                            value={form.street}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="block font-medium mb-2">

                            Landmark

                        </label>

                        <input
                            type="text"
                            name="landmark"
                            value={form.landmark}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div>

                            <label className="block font-medium mb-2">

                                City *

                            </label>

                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="block font-medium mb-2">

                                State *

                            </label>

                            <input
                                type="text"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="block font-medium mb-2">

                                Pincode *

                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={form.pincode}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block font-medium mb-2">

                            Address Type

                        </label>

                        <select
                            name="addressType"
                            value={form.addressType}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        >

                            <option value="Home">🏠 Home</option>

                            <option value="Work">🏢 Work</option>

                            <option value="Other">📍 Other</option>

                        </select>

                    </div>

                    <div className="border rounded-xl p-5 bg-slate-50">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="font-semibold">

                                    Current Location

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Helps delivery partners locate your address.

                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={detectLocation}
                                disabled={detecting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                            >

                                {detecting

                                    ? "Detecting..."

                                    : "📍 Detect"}

                            </button>

                        </div>

                        {form.latitude && (

                            <div className="mt-4 text-sm text-slate-600">

                                <p>

                                    Latitude:
                                    {" "}
                                    {form.latitude}

                                </p>

                                <p>

                                    Longitude:
                                    {" "}
                                    {form.longitude}

                                </p>

                            </div>

                        )}

                    </div>

                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={form.isDefault}
                            onChange={handleChange}
                        />

                        <label>

                            Make this my default address

                        </label>

                    </div>

                    <div className="flex gap-4 pt-6">

                        <button
                            type="button"
                            onClick={() => navigate("/profile/addresses")}
                            className="flex-1 border border-slate-300 py-3 rounded-xl hover:bg-slate-100"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                        >

                            {loading
                                ? "Saving..."
                                : isEdit
                                ? "Update Address"
                                : "Save Address"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}