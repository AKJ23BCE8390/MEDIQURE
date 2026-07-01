import express from "express";

import {
    getChemistOrders,
    getOrderDetails, // <-- Make sure this is imported
    updateOrderStatus
} from "../controllers/chemistOrderController.js";

import {
    verifyToken
} from "../middleware/authMiddleware.js";

import {
    isChemist
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/orders",
    verifyToken,
    isChemist,
    getChemistOrders
);

router.put(
    "/orders/:id/status",
    verifyToken,
    isChemist,
    updateOrderStatus
);

// FIX IS HERE: Changed from router.put to router.get, and updated the controller function
router.get(
    "/order/:id/detail",
    verifyToken,
    isChemist,
    getOrderDetails 
);

export default router;