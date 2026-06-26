import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const addToCart = async (
    req,
    res
) => {
    try {

        const {
            productId,
            quantity
        } = req.body;

        const carts =
            db.collection(
                "carts"
            );

        const existingCart =
            await carts.findOne({
                userId:
                    req.user.id
            });

        if (!existingCart) {

            await carts.insertOne({
                userId:
                    req.user.id,

                items: [
                    {
                        productId,
                        quantity
                    }
                ],

                updatedAt:
                    new Date()
            });

            return res
                .status(201)
                .json({
                    message:
                        "Product added to cart"
                });
        }

        const existingItem =
            existingCart.items.find(
                item =>
                    item.productId ===
                    productId
            );

        if (existingItem) {

            await carts.updateOne(
                {
                    userId:
                        req.user.id,

                    "items.productId":
                        productId
                },
                {
                    $inc: {
                        "items.$.quantity":
                            quantity
                    }
                }
            );

        } else {

            await carts.updateOne(
                {
                    userId:
                        req.user.id
                },
                {
                    $push: {
                        items: {
                            productId,
                            quantity
                        }
                    }
                }
            );
        }

        res.status(200).json({
            message:
                "Product added to cart"
        });

    } catch (error) {
        res.status(500).json({
            message:
                error.message
        });
    }
};

export const getCart = async (
    req,
    res
) => {
    try {

        const cart =
            await db
                .collection(
                    "carts"
                )
                .findOne({
                    userId:
                        req.user.id
                });

        if (!cart) {
            return res
                .status(200)
                .json({
                    items: [],
                    total: 0
                });
        }

        const items =
            await Promise.all(
                cart.items.map(
                    async item => {

                        const product =
                            await db
                                .collection(
                                    "products"
                                )
                                .findOne({
                                    _id:
                                        new ObjectId(
                                            item.productId
                                        )
                                });

                        if (
                            !product
                        ) {
                            return null;
                        }

                        return {
                            productId:
                                item.productId,

                            quantity:
                                item.quantity,

                            name:
                                product.name,

                            image:
                                product.image,

                            price:
                                product.price,

                            subtotal:
                                Number(
                                    product.price
                                ) *
                                Number(
                                    item.quantity
                                )
                        };
                    }
                )
            );

        const validItems =
            items.filter(
                item =>
                    item !== null
            );

        const total =
            validItems.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    item.subtotal,
                0
            );

        res.status(200).json({
            items:
                validItems,

            total
        });

    } catch (error) {
        res.status(500).json({
            message:
                error.message
            });
        }
};

export const updateCartItem =
    async (req, res) => {
        try {

            const {
                productId,
                quantity
            } = req.body;

            await db
                .collection(
                    "carts"
                )
                .updateOne(
                    {
                        userId:
                            req.user.id,

                        "items.productId":
                            productId
                    },
                    {
                        $set: {
                            "items.$.quantity":
                                quantity
                        }
                    }
                );

            res.status(200).json({
                message:
                    "Cart updated"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const removeCartItem =
    async (req, res) => {
        try {

            const {
                productId
            } = req.params;

            await db
                .collection(
                    "carts"
                )
                .updateOne(
                    {
                        userId:
                            req.user.id
                    },
                    {
                        $pull: {
                            items: {
                                productId
                            }
                        }
                    }
                );

            res.status(200).json({
                message:
                    "Item removed"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const clearCart =
    async (req, res) => {
        try {

            await db
                .collection(
                    "carts"
                )
                .deleteOne({
                    userId:
                        req.user.id
                });

            res.status(200).json({
                message:
                    "Cart cleared"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };