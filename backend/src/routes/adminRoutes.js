import express from "express";
import { assignDeliveryBoy } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import{
    getPendingChemists,
    approveChemist,
    rejectChemist,
    getAdminStats,
    getRecentOrders,
    getOrderSummary,
    getMonthlyRevenue,
    getAllDeliveryBoys
} from "../controllers/adminController.js";


const router = express.Router();

router.put(
    "/orders/:orderId/assign",
    verifyToken,
    isAdmin,
    assignDeliveryBoy
);

router.get("/test", (req, res) => {
    res.json({
        message: "Admin route working"
    });
});

router.get(
    "/chemists/pending",
    verifyToken,
    isAdmin,
    getPendingChemists
);

router.put(
    "/chemists/:chemistId/approve",
    verifyToken,
    isAdmin,
    approveChemist
);

router.put(
    "/chemists/:chemistId/reject",
    verifyToken,
    isAdmin,
    rejectChemist
);

router.get(
    "/stats",
    verifyToken,
    isAdmin,
    getAdminStats
);

router.get(
    "/orders/recent",
    verifyToken,
    isAdmin,
    getRecentOrders
);

router.get(
    "/orders/summary",
    verifyToken,
    isAdmin,
    getOrderSummary
);

router.get(
    "/revenue/monthly",
    verifyToken,
    isAdmin,
    getMonthlyRevenue
);

router.get(
    "/delivery-boys",
    verifyToken,
    isAdmin,
    getAllDeliveryBoys
);

export default router;