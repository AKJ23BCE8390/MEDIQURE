import { ObjectId } from "mongodb";
import { db } from "../config/db.js";
import { io } from "../server.js";

export const getChemistOrders = async (
    req,
    res
) => {
    try {
        const chemistId =
            req.user.id;

        const orders =
            await db
                .collection(
                    "orders"
                )
                .find({
                    "items.chemistId":
                        chemistId
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

export const getOrderDetails = async (req, res) => {
    try {

        const { id } = req.params;

        const order = await db.collection("orders").findOne({
            _id: new ObjectId(id)
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const updateOrderStatus =
    async (req, res) => {
        try {
            const { id } =
                req.params;

            const { status } =
                req.body;

            const allowedStatuses =
                [
                    "Accepted",
                    "Rejected",
                    "Packed",
                    "Ready For Pickup",
                    "Out For Delivery",
                    "Delivered",
                    "Cancelled"
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

            await db
                .collection(
                    "orders"
                )
                .updateOne(
                    {
                        _id:
                            new ObjectId(
                                id
                            )
                    },
                    {
                        $set: {
                            status,
                            updatedAt:
                                new Date()
                        }
                    }
                );

            const notification =
                {
                    userId:
                        order.userId,

                    orderId:
                        order._id
                            .toString(),

                    title:
                        "Order Status Updated",

                    message:
                        `Your order is now ${status}`,

                    isRead:
                        false,

                    createdAt:
                        new Date()
                };

            await db
                .collection(
                    "notifications"
                )
                .insertOne(
                    notification
                );

            io.emit(
                `user-${order.userId}`,
                notification
            );

            res.status(200).json({
                message:
                    "Order status updated successfully"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };