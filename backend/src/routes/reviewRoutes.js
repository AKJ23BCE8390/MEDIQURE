import express from "express";

import {
    addReview,
    getProductRating,
    getProductReviews
}
from "../controllers/reviewController.js";

import {
    verifyToken
}
from "../middleware/authMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    verifyToken,
    addReview
);

router.get(
    "/:productId",
    getProductReviews
);

router.get(
    "/rating/:productId",
    getProductRating
)

export default router;