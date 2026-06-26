import express from "express";

import {
    placeOrder,
    getMyOrders,
    getOrderById,
    trackOrder
} from "../controllers/orderController.js";

import {
    verifyToken
} from "../middleware/authMiddleware.js";

import {
    isUser
} from "../middleware/roleMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    verifyToken,
    isUser,
    placeOrder
);

router.get(
    "/my-orders",
    verifyToken,
    isUser,
    getMyOrders
);

router.get(
    "/:id",
    verifyToken,
    isUser,
    getOrderById
);

router.get(
    "/:orderId/track",
    verifyToken,
    trackOrder
)

export default router;