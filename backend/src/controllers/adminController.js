import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const assignDeliveryBoy =
    async (req, res) => {
        try {

            const { orderId } =
                req.params;

            const {
                deliveryBoyId
            } = req.body;

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

            const deliveryBoy =
                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .findOne({
                        _id:
                            new ObjectId(
                                deliveryBoyId
                            )
                    });

            if (!deliveryBoy) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Delivery boy not found"
                    });
            }

            if (
                deliveryBoy.isAvailable ===
                false
            ) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Delivery boy is already assigned"
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
                            deliveryBoyId,
                            status:
                                "Assigned",
                            assignedAt:
                                new Date()
                        }
                    }
                );

            await db
                .collection(
                    "deliveryBoys"
                )
                .updateOne(
                    {
                        _id:
                            new ObjectId(
                                deliveryBoyId
                            )
                    },
                    {
                        $set: {
                            isAvailable:
                                false,

                            currentOrderId:
                                orderId,

                            assignedAt:
                                new Date()
                        }
                    }
                );
                await db
    .collection(
        "notifications"
    )
    .insertOne({
        userId:
            deliveryBoyId,

        role:
            "deliveryBoy",

        title:
            "New Delivery Assigned",

        message:
            `Order #${orderId} has been assigned to you.`,

        isRead:
            false,

        createdAt:
            new Date()
    });

            res.status(200).json({
                message:
                    "Delivery boy assigned successfully"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getPendingChemists =
    async (req, res) => {
        try {
            const chemists =
                await db
                    .collection(
                        "chemists"
                    )
                    .find({
                        approvalStatus:
                            "Pending"
                    })
                    .project({
                        password: 0
                    })
                    .toArray();

            res.status(200).json(
                chemists
            );

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const approveChemist =
    async (req, res) => {
        try {
            const {
                chemistId
            } = req.params;

            const result =
                await db
                    .collection(
                        "chemists"
                    )
                    .updateOne(
                        {
                            _id:
                                new ObjectId(
                                    chemistId
                                )
                        },
                        {
                            $set: {
                                approvalStatus:
                                    "Approved",

                                isApproved:
                                    true,

                                approvedAt:
                                    new Date()
                            }
                        }
                    );

            if (
                result.matchedCount ===
                0
            ) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Chemist not found"
                    });
            }
            await db
    .collection(
        "notifications"
    )
    .insertOne({
        userId:
            chemistId,

        role:
            "chemist",

        title:
            "Account Approved",

        message:
            "Your chemist account has been approved by admin.",

        isRead:
            false,

        createdAt:
            new Date()
    });

            res.status(200).json({
                message:
                    "Chemist approved successfully"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const rejectChemist =
    async (req, res) => {
        try {
            const {
                chemistId
            } = req.params;

            await db
                .collection(
                    "chemists"
                )
                .updateOne(
                    {
                        _id:
                            new ObjectId(
                                chemistId
                            )
                    },
                    {
                        $set: {
                            approvalStatus:
                                "Rejected",

                            isApproved:
                                false,

                            rejectedAt:
                                new Date()
                        }
                    }
                );
                await db
    .collection(
        "notifications"
    )
    .insertOne({
        userId:
            chemistId,

        role:
            "chemist",

        title:
            "Account Rejected",

        message:
            "Your chemist account was rejected by admin.",

        isRead:
            false,

        createdAt:
            new Date()
    });

            res.status(200).json({
                message:
                    "Chemist rejected"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getAdminStats =
    async (req, res) => {
        try {

            const totalUsers =
                await db
                    .collection("users")
                    .countDocuments();

            const totalChemists =
                await db
                    .collection("chemists")
                    .countDocuments();

            const pendingChemists =
                await db
                    .collection("chemists")
                    .countDocuments({
                        approvalStatus:
                            "Pending"
                    });

            const totalDeliveryBoys =
                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .countDocuments();

            const totalOrders =
                await db
                    .collection("orders")
                    .countDocuments();

            const deliveredOrders =
                await db
                    .collection("orders")
                    .find({
                        paymentStatus:
                            "Paid"
                    })
                    .toArray();

            let totalRevenue = 0;

            deliveredOrders.forEach(
                order => {
                    totalRevenue +=
                        order.totalAmount || 0;
                }
            );

            res.status(200).json({
                totalUsers,

                totalChemists,

                pendingChemists,

                totalDeliveryBoys,

                totalOrders,

                totalRevenue
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getRecentOrders =
    async (req, res) => {
        try {
            const orders =
                await db
                    .collection("orders")
                    .find({})
                    .sort({
                        createdAt: -1
                    })
                    .limit(10)
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

export const getOrderSummary =
    async (req, res) => {
        try {
            const summary =
                await db
                    .collection("orders")
                    .aggregate([
                        {
                            $group: {
                                _id: "$status",
                                count: {
                                    $sum: 1
                                }
                            }
                        }
                    ])
                    .toArray();

            const result = {};

            summary.forEach(
                item => {
                    result[
                        item._id
                    ] =
                        item.count;
                }
            );

            res.status(200).json(
                result
            );

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getMonthlyRevenue =
    async (req, res) => {
        try {

            const revenue =
                await db
                    .collection("orders")
                    .aggregate([
                        {
                            $match: {
                                paymentStatus:
                                    "Paid"
                            }
                        },

                        {
                            $group: {
                                _id: {
                                    month: {
                                        $month:
                                            "$createdAt"
                                    },

                                    year: {
                                        $year:
                                            "$createdAt"
                                    }
                                },

                                revenue: {
                                    $sum:
                                        "$totalAmount"
                                }
                            }
                        },

                        {
                            $sort: {
                                "_id.year": 1,
                                "_id.month": 1
                            }
                        }
                    ])
                    .toArray();

            res.status(200).json(
                revenue
            );

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const getAllDeliveryBoys =
    async (req, res) => {
        try {

            const query = {};

            if (
                req.query.available ===
                "true"
            ) {
                query.isAvailable =
                    true;
            }

            const deliveryBoys =
                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .find(query)
                    .project({
                        password: 0
                    })
                    .toArray();

            res.status(200).json(
                deliveryBoys
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };