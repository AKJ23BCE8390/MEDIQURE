import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const addToWishlist = async (req, res) => {
    try {

        const userId = req.user.id;
        const productObjectId = new ObjectId(req.body.productId);

        const existing = await db
            .collection("wishlists")
            .findOne({
                userId,
                productId: productObjectId
            });

        if (existing) {
            return res.status(400).json({
                message: "Product already in wishlist"
            });
        }

        await db.collection("wishlists").insertOne({
            userId,
            productId: productObjectId,
            createdAt: new Date()
        });

        res.status(201).json({
            message: "Added to wishlist"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const getWishlist = async (req, res) => {

    try {

        const userId = req.user.id;

        const wishlist = await db
            .collection("wishlists")
            .aggregate([
                {
                    $match: {
                        userId
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "product"
                    }
                },
                {
                    $unwind: "$product"
                }
            ])
            .toArray();

        res.json(wishlist);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const removeWishlist = async (req, res) => {

    try {

        const { id } = req.params;

        await db.collection("wishlists").deleteOne({
            _id: new ObjectId(id)
        });

        res.json({
            message: "Removed from wishlist"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};