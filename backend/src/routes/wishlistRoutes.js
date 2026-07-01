import express from "express";

import {
    addToWishlist,
    getWishlist,
    removeWishlist
} from "../controllers/wishlistController.js";

import {
    verifyToken
} from "../middleware/authMiddleware.js";

import {
    isUser
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    isUser,
    addToWishlist
);

router.get(
    "/",
    verifyToken,
    isUser,
    getWishlist
);

router.delete(
    "/:id",
    verifyToken,
    isUser,
    removeWishlist
);

export default router;