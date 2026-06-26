import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const addReview =
    async (req, res) => {
        try {

            const {
                productId,
                rating,
                comment
            } = req.body;

            const existing =
                await db
                    .collection(
                        "reviews"
                    )
                    .findOne({
                        productId,
                        userId:
                            req.user.id
                    });

            if (existing) {

                return res
                    .status(400)
                    .json({
                        message:
                            "You already reviewed this product"
                    });
            }

            await db
                .collection(
                    "reviews"
                )
                .insertOne({
                    productId,

                    userId:
                        req.user.id,

                    rating,

                    comment,

                    createdAt:
                        new Date()
                });

            res.status(201).json({
                message:
                    "Review added"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getProductReviews =
    async (req, res) => {
        try {

            const {
                productId
            } = req.params;

            const reviews =
                await db
                    .collection(
                        "reviews"
                    )
                    .find({
                        productId
                    })
                    .sort({
                        createdAt:
                            -1
                    })
                    .toArray();

            res.status(200).json(
                reviews
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getProductRating =
    async (req, res) => {
        try {

            const {
                productId
            } = req.params;

            const reviews =
                await db
                    .collection(
                        "reviews"
                    )
                    .find({
                        productId
                    })
                    .toArray();

            if (
                reviews.length === 0
            ) {

                return res.status(200).json({
                    averageRating:
                        0,

                    totalReviews:
                        0
                });
            }

            const total =
                reviews.reduce(
                    (
                        sum,
                        review
                    ) =>
                        sum +
                        review.rating,
                    0
                );

            res.status(200).json({
                averageRating:
                    (
                        total /
                        reviews.length
                    ).toFixed(1),

                totalReviews:
                    reviews.length
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };