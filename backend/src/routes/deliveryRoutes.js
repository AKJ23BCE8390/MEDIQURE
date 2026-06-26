import express from "express";

import {
    getDeliveryProfile
}
from "../controllers/deliveryController.js";

import {
    verifyToken
}
from "../middleware/authMiddleware.js";

import {
    isDeliveryBoy
}
from "../middleware/roleMiddleware.js";

import {
    getAssignedOrders,
    updateDeliveryStatus,
    updateLocation,
    collectCash,
    getDeliveryHistory,
    getDeliveryStats
}
from "../controllers/deliveryController.js";


const router =
    express.Router();

router.get(
    "/profile",
    verifyToken,
    isDeliveryBoy,
    getDeliveryProfile
);

router.get(
    "/orders",
    verifyToken,
    isDeliveryBoy,
    getAssignedOrders
);

router.put(
    "/orders/:id/status",
    verifyToken,
    isDeliveryBoy,
    updateDeliveryStatus
);

router.put(
    "/location",
    verifyToken,
    isDeliveryBoy,
    updateLocation
)

router.put(
    "/orders/:orderId/collect-cash",
    verifyToken,
    isDeliveryBoy,
    collectCash
)

router.get(
    "/history",
    verifyToken,
    getDeliveryHistory
);

router.get(
    "/stats",
    verifyToken,
    getDeliveryStats
);

export default router;