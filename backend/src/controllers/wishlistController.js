import { db } from "../config/db.js";

export const addToWishlist =
    async (req, res) => {

        const {
            productId
        } = req.body;

        await db
            .collection(
                "wishlist"
            )
            .insertOne({
                userId:
                    req.user.id,

                productId,

                createdAt:
                    new Date()
            });

        res.status(201).json({
            message:
                "Added to wishlist"
        });
    };

export const getWishlist =
    async (req, res) => {

        const items =
            await db
                .collection(
                    "wishlist"
                )
                .find({
                    userId:
                        req.user.id
                })
                .toArray();

        res.status(200).json(
            items
        );
    };