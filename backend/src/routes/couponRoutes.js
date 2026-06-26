import express from "express";

import {
    validateCoupon,
    createCoupon,
    getAllCoupons,
    toggleCoupon,
    deleteCoupon
}
from "../controllers/couponController.js";

import {
    verifyToken
}
from "../middleware/authMiddleware.js";

import {
    isAdmin
}
from "../middleware/roleMiddleware.js";

const router =
    express.Router();

/* User */

router.post(
    "/validate",
    verifyToken,
    validateCoupon
);

/* Admin */

router.post(
    "/",
    verifyToken,
    isAdmin,
    createCoupon
);

router.get(
    "/",
    verifyToken,
    isAdmin,
    getAllCoupons
);

router.put(
    "/toggle/:id",
    verifyToken,
    isAdmin,
    toggleCoupon
);

router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    deleteCoupon
);

export default router;