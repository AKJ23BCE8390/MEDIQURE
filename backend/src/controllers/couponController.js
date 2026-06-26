import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const createCoupon =
    async (req, res) => {
        try {

            const coupon =
                req.body;

            coupon.code =
                coupon.code.toUpperCase();

            coupon.isActive =
                true;

            coupon.createdAt =
                new Date();

            const result =
                await db
                    .collection(
                        "coupons"
                    )
                    .insertOne(
                        coupon
                    );

            res.status(201).json({
                message:
                    "Coupon created",

                id:
                    result.insertedId
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getAllCoupons =
    async (req, res) => {
        try {

            const coupons =
                await db
                    .collection(
                        "coupons"
                    )
                    .find()
                    .sort({
                        createdAt:
                            -1
                    })
                    .toArray();

            res.status(200).json(
                coupons
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const toggleCoupon =
    async (req, res) => {
        try {

            const {
                id
            } = req.params;

            const coupon =
                await db
                    .collection(
                        "coupons"
                    )
                    .findOne({
                        _id:
                            new ObjectId(
                                id
                            )
                    });

            if (!coupon) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Coupon not found"
                    });
            }

            await db
                .collection(
                    "coupons"
                )
                .updateOne(
                    {
                        _id:
                            coupon._id
                    },
                    {
                        $set: {
                            isActive:
                                !coupon.isActive
                        }
                    }
                );

            res.status(200).json({
                message:
                    "Coupon updated"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const deleteCoupon =
    async (req, res) => {
        try {

            const {
                id
            } = req.params;

            await db
                .collection(
                    "coupons"
                )
                .deleteOne({
                    _id:
                        new ObjectId(
                            id
                        )
                });

            res.status(200).json({
                message:
                    "Coupon deleted"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

    export const validateCoupon =
    async (req, res) => {
        try {

            const {
                code,
                orderAmount
            } = req.body;

            const coupon =
                await db
                    .collection(
                        "coupons"
                    )
                    .findOne({
                        code:
                            code.toUpperCase(),

                        isActive:
                            true
                    });

            if (!coupon) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Invalid coupon"
                    });
            }

            if (
                coupon.expiryDate &&
                new Date() >
                new Date(
                    coupon.expiryDate
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Coupon expired"
                    });
            }

            if (
                orderAmount <
                coupon.minOrderAmount
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            `Minimum order amount is ₹${coupon.minOrderAmount}`
                    });
            }

            let discount = 0;

            if (
                coupon.discountType ===
                "PERCENTAGE"
            ) {

                discount =
                    orderAmount *
                    (
                        coupon.discountValue /
                        100
                    );

                if (
                    coupon.maxDiscount
                ) {

                    discount =
                        Math.min(
                            discount,
                            coupon.maxDiscount
                        );
                }

            } else {

                discount =
                    coupon.discountValue;
            }

            const finalAmount =
                Math.max(
                    0,
                    orderAmount -
                    discount
                );

            res.status(200).json({
                couponCode:
                    coupon.code,

                discount,

                finalAmount
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };