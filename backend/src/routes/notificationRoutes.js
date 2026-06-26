import express from "express";

import {
    getNotifications,
    markAsRead
}
from "../controllers/notificationController.js";

import {
    verifyToken
}
from "../middleware/authMiddleware.js";

const router =
    express.Router();

router.get(
    "/",
    verifyToken,
    getNotifications
);

router.put(
    "/:notificationId/read",
    verifyToken,
    markAsRead
);

export default router;