import express from "express";

import {
    getChemistOrders,
    updateOrderStatus
} from "../controllers/chemistOrderController.js";

import {
    verifyToken
} from "../middleware/authMiddleware.js";

import {
    isChemist
} from "../middleware/roleMiddleware.js";

const router =
    express.Router();

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

export default router;