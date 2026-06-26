import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CreateCoupon() {

    const navigate =
        useNavigate();

    const [form,
        setForm] =
        useState({
            code: "",
            discountType:
                "PERCENTAGE",
            discountValue: "",
            minOrderAmount: "",
            maxDiscount: "",
            expiryDate: ""
        });

    const handleChange =
        e => {

            setForm({
                ...form,
                [e.target.name]:
                    e.target.value
            });
        };

    const submit =
        async e => {

            e.preventDefault();

            try {

                await api.post(
                    "/coupons",
                    {
                        ...form,
                        discountValue:
                            Number(
                                form.discountValue
                            ),

                        minOrderAmount:
                            Number(
                                form.minOrderAmount
                            ),

                        maxDiscount:
                            Number(
                                form.maxDiscount
                            )
                    }
                );

                alert(
                    "Coupon created successfully"
                );

                navigate(
                    "/admin/coupons"
                );

            } catch (error) {

                alert(
                    error.response?.data
                        ?.message ||
                    "Failed to create coupon"
                );
            }
        };

    return (
        <div
            style={{
                padding:
                    "20px",
                maxWidth:
                    "600px",
                margin:
                    "auto"
            }}
        >
            <h1>
                Create Coupon
            </h1>

            <form
                onSubmit={
                    submit
                }
            >
                <input
                    name="code"
                    placeholder="Coupon Code"
                    value={
                        form.code
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <br />
                <br />

                <select
                    name="discountType"
                    value={
                        form.discountType
                    }
                    onChange={
                        handleChange
                    }
                >
                    <option value="PERCENTAGE">
                        Percentage
                    </option>

                    <option value="FLAT">
                        Flat Discount
                    </option>
                </select>

                <br />
                <br />

                <input
                    type="number"
                    name="discountValue"
                    placeholder="Discount Value"
                    value={
                        form.discountValue
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <br />
                <br />

                <input
                    type="number"
                    name="minOrderAmount"
                    placeholder="Minimum Order Amount"
                    value={
                        form.minOrderAmount
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <br />
                <br />

                <input
                    type="number"
                    name="maxDiscount"
                    placeholder="Maximum Discount"
                    value={
                        form.maxDiscount
                    }
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <input
                    type="date"
                    name="expiryDate"
                    value={
                        form.expiryDate
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <br />
                <br />

                <button
                    type="submit"
                >
                    Create Coupon
                </button>
            </form>
        </div>
    );
}