import {
    useEffect,
    useState
} from "react";

import api
from "../../services/api";
import { Link } from "react-router-dom";

export default function Coupons() {

    const [coupons,
        setCoupons] =
        useState([]);

    const fetchCoupons =
        async () => {

            const res =
                await api.get(
                    "/coupons"
                );

            setCoupons(
                res.data
            );
        };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const toggleCoupon =
        async id => {

            await api.put(
                `/coupons/toggle/${id}`
            );

            fetchCoupons();
        };

    const deleteCoupon =
        async id => {

            if (
                !window.confirm(
                    "Delete coupon?"
                )
            ) {
                return;
            }

            await api.delete(
                `/coupons/${id}`
            );

            fetchCoupons();
        };

    return (
        <div
            style={{
                padding:
                    "20px"
            }}
        >
            <h1>
                Coupons
            </h1>
            <Link
    to="/admin/create-coupon"
>
    <button>
        Create Coupon
    </button>
</Link>

            {coupons.map(
                coupon => (
                    <div
                        key={
                            coupon._id
                        }
                    >
                        <h3>
                            {
                                coupon.code
                            }
                        </h3>

                        <p>
                            {
                                coupon.discountValue
                            }
                            %
                        </p>

                        <p>
                            {
                                coupon.isActive
                                    ? "Active"
                                    : "Inactive"
                            }
                        </p>

                        <button
                            onClick={() =>
                                toggleCoupon(
                                    coupon._id
                                )
                            }
                        >
                            Toggle
                        </button>

                        <button
                            onClick={() =>
                                deleteCoupon(
                                    coupon._id
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                )
            )}
        </div>
    );
}