import { ObjectId } from "mongodb";
import { db } from "../config/db.js";
import {io} from "../server.js";

export const getDeliveryProfile =
    async (req, res) => {
        try {
            const deliveryBoy =
                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .findOne(
                        {
                            _id:
                                new ObjectId(
                                    req.user.id
                                )
                        },
                        {
                            projection:
                                {
                                    password: 0
                                }
                        }
                    );

            res.status(200).json(
                deliveryBoy
            );

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getAssignedOrders =
    async (req, res) => {
        try {

            const orders =
                await db
                    .collection("orders")
                    .find({
                        deliveryBoyId:
                            req.user.id,

                        status: {
                            $in: [
                                "Assigned",
                                "Out For Delivery"
                            ]
                        }
                    })
                    .sort({
                        createdAt: -1
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

export const updateDeliveryStatus =
    async (req, res) => {
        try {

            const { id } =
                req.params;

            const { status } =
                req.body;

            const allowedStatuses =
                [
                    "Out For Delivery",
                    "Delivered"
                ];

            if (
                !allowedStatuses.includes(
                    status
                )
            ) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Invalid status"
                    });
            }

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
                        deliveryBoyId:
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

            const updateData = {
    status,
    updatedAt:
        new Date()
};

if (
    status ===
    "Out For Delivery"
) {
    updateData.outForDeliveryAt =
        new Date();
}

if (
    status ===
    "Delivered"
) {
    updateData.deliveredAt =
        new Date();
    await db
    .collection(
        "notifications"
    )
    .insertOne({
        userId:
            order.userId,

        role:
            "user",

        title:
            "Order Delivered",

        message:
            "Your order has been delivered successfully.",

        isRead:
            false,

        createdAt:
            new Date()
    });
}

await db
    .collection("orders")
    .updateOne(
        {
            _id:
                new ObjectId(id)
        },
        {
            $set:
                updateData
        }
    );

            if (
                status ===
                "Delivered"
            ) {

                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .updateOne(
                        {
                            _id:
                                new ObjectId(
                                    req.user.id
                                )
                        },
                        {
                            $set: {
                                isAvailable:
                                    true
                            },

                            $unset: {
                                currentOrderId:
                                    ""
                            }
                        }
                    );
            }

            res.status(200).json({
                message:
                    "Status updated"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const updateLocation =
    async (req, res) => {
        try {

            const {
                latitude,
                longitude,
                orderId
            } = req.body;

            const activeOrder =
                await db
                    .collection("orders")
                    .findOne({
                        deliveryBoyId:
                            req.user.id,

                        status: {
                            $in: [
                                "Assigned",
                                "Out For Delivery"
                            ]
                        }
                    });

            if (!activeOrder) {
                return res
                    .status(400)
                    .json({
                        message:
                            "No active delivery"
                    });
            }

            await db
                .collection(
                    "deliveryBoys"
                )
                .updateOne(
                    {
                        _id:
                            new ObjectId(
                                req.user.id
                            )
                    },
                    {
                        $set: {
                            currentLocation: {
                                latitude,
                                longitude
                            },

                            locationUpdatedAt:
                                new Date()
                        }
                    }
                );

            if (orderId) {

                io.to(orderId).emit(
                    "location-update",
                    {
                        orderId,
                        latitude,
                        longitude,

                        updatedAt:
                            new Date()
                    }
                );
            }

            res.status(200).json({
                message:
                    "Location updated successfully"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const collectCash =
    async (req, res) => {
        try {

            const { orderId } =
                req.params;

            const order =
                await db
                    .collection("orders")
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
                order.paymentMethod !==
                "COD"
            ) {
                return res
                    .status(400)
                    .json({
                        message:
                            "This order is not COD"
                    });
            }

            if (
                order.paymentCollected
            ) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Cash already collected"
                    });
            }

            await db
                .collection("orders")
                .updateOne(
                    {
                        _id:
                            new ObjectId(
                                orderId
                            )
                    },
                    {
                        $set: {
                            paymentStatus:
                                "Paid",

                            paymentCollected:
                                true,

                            cashCollectedAt:
                                new Date()
                        }
                    }
                );

            res.status(200).json({
                message:
                    "Cash collected successfully"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getDeliveryHistory =
    async (req, res) => {
        try {

            const orders =
                await db
                    .collection("orders")
                    .find({
                        deliveryBoyId:
                            req.user.id,

                        status:
                            "Delivered"
                    })
                    .sort({
                        deliveredAt:
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

export const getDeliveryStats =
    async (req, res) => {
        try {

            const totalDelivered =
                await db
                    .collection("orders")
                    .countDocuments({
                        deliveryBoyId:
                            req.user.id,

                        status:
                            "Delivered"
                    });

            const totalCOD =
                await db
                    .collection("orders")
                    .countDocuments({
                        deliveryBoyId:
                            req.user.id,

                        paymentCollected:
                            true
                    });

            res.status(200).json({
                totalDelivered,
                totalCOD
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };