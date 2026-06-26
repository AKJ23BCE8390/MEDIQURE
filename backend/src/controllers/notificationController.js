import { db } from "../config/db.js";

export const getNotifications =
    async (req, res) => {
        try {

            const notifications =
                await db
                    .collection(
                        "notifications"
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
                notifications
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const markAsRead =
    async (req, res) => {
        try {

            await db
                .collection(
                    "notifications"
                )
                .updateOne(
                    {
                        _id:
                            new ObjectId(
                                req.params.id
                            )
                    },
                    {
                        $set: {
                            isRead:
                                true
                        }
                    }
                );

            res.status(200).json({
                message:
                    "Notification read"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };