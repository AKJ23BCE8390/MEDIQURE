import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const placeOrder = async (req, res) => {
    try {

        const {
            addressId,
            prescriptionId,
            paymentMethod
        } = req.body;

        if (
            !["COD", "ONLINE"].includes(
                paymentMethod
            )
        ) {
            return res.status(400).json({
                message:
                    "Invalid payment method"
            });
        }

        const userId =
            req.user.id;

        const cart =
            await db
                .collection("carts")
                .findOne({
                    userId
                });

        if (
            !cart ||
            cart.items.length === 0
        ) {
            return res.status(400).json({
                message:
                    "Cart is empty"
            });
        }

        const user =
            await db
                .collection("users")
                .findOne({
                    _id:
                        new ObjectId(
                            userId
                        )
                });

        if (
            !user ||
            !user.addresses
        ) {
            return res.status(404).json({
                message:
                    "User or addresses not found"
            });
        }

        const address =
            user.addresses.find(
                address =>
                    address._id.toString() ===
                    addressId
            );

        if (!address) {
            return res.status(404).json({
                message:
                    "Address not found"
            });
        }

        const orderItems = [];

        let totalAmount = 0;

        for (const item of cart.items) {

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

            if (!product) {
                continue;
            }

            orderItems.push({
                productId:
                    product._id.toString(),

                chemistId:
                    product.chemistId,

                name:
                    product.name,

                price:
                    product.price,

                quantity:
                    item.quantity,

                subtotal:
                    product.price *
                    item.quantity
            });

            totalAmount +=
                product.price *
                item.quantity;
        }

        const result =
            await db
                .collection("orders")
                .insertOne({
                    userId,

                    items:
                        orderItems,

                    deliveryAddress:
                        address,

                    prescriptionId:
                        prescriptionId ||
                        null,

                    totalAmount,

                    paymentMethod,

                    paymentStatus:
                        paymentMethod ===
                        "COD"
                            ? "Pending"
                            : "Paid",

                    paymentCollected:
                        false,

                    deliveryBoyId:
                        null,

                    status:
                        "Pending",

                    createdAt:
                        new Date()
                });

        // Notify Chemists

        const notifiedChemists =
            new Set();

        for (const item of orderItems) {

            if (
                notifiedChemists.has(
                    item.chemistId
                )
            ) {
                continue;
            }

            notifiedChemists.add(
                item.chemistId
            );

            await db
                .collection(
                    "notifications"
                )
                .insertOne({
                    userId:
                        item.chemistId,

                    role:
                        "chemist",

                    title:
                        "New Order Received",

                    message:
                        `New order #${result.insertedId} has been placed.`,

                    isRead:
                        false,

                    createdAt:
                        new Date()
                });
        }

        // Notify User

        await db
            .collection(
                "notifications"
            )
            .insertOne({
                userId,

                role:
                    "user",

                title:
                    "Order Placed",

                message:
                    `Your order #${result.insertedId} has been placed successfully.`,

                isRead:
                    false,

                createdAt:
                    new Date()
            });

        // Clear Cart

        await db
            .collection("carts")
            .deleteOne({
                userId
            });

        res.status(201).json({
            message:
                "Order placed successfully",

            orderId:
                result.insertedId,

            paymentMethod,

            paymentStatus:
                paymentMethod ===
                "COD"
                    ? "Pending"
                    : "Paid"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

export const getMyOrders =
    async (req, res) => {
        try {

            const orders =
                await db
                    .collection(
                        "orders"
                    )
                    .find({
                        userId:
                            req.user.id
                    })
                    .sort({
                        createdAt:
                            -1
                    })
                    .toArray();

            res.status(200).json(
                orders
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getOrderById =
    async (req, res) => {
        try {

            const { id } =
                req.params;

            const order =
                await db
                    .collection(
                        "orders"
                    )
                    .findOne({
                        _id:
                            new ObjectId(
                                id
                            ),

                        userId:
                            req.user.id
                    });

            if (!order) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Order not found"
                    });
            }

            res.status(200).json(
                order
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const trackOrder =
    async (req, res) => {
        try {

            const {
                orderId
            } = req.params;

            const order =
                await db
                    .collection(
                        "orders"
                    )
                    .findOne({
                        _id:
                            new ObjectId(
                                orderId
                            )
                    });

            if (!order) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Order not found"
                    });
            }

            if (
                !order.deliveryBoyId
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Delivery boy not assigned yet"
                    });
            }

            const deliveryBoy =
                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .findOne(
                        {
                            _id:
                                new ObjectId(
                                    order.deliveryBoyId
                                )
                        },
                        {
                            projection: {
                                password: 0
                            }
                        }
                    );

            if (
                !deliveryBoy
            ) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Delivery boy not found"
                    });
            }

            res.status(200).json({
                orderId:
                    order._id,

                status:
                    order.status,

                paymentMethod:
                    order.paymentMethod,

                paymentStatus:
                    order.paymentStatus,

                totalAmount:
                    order.totalAmount,

                deliveryBoy: {
                    id:
                        deliveryBoy._id,

                    name:
                        deliveryBoy.name,

                    phone:
                        deliveryBoy.phone
                },

                location:
                    deliveryBoy.currentLocation,

                updatedAt:
                    deliveryBoy.locationUpdatedAt
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };