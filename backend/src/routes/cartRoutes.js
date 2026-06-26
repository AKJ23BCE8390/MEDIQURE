import express from "express";

import {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controllers/cartController.js";

import {
    verifyToken
} from "../middleware/authMiddleware.js";

import {
    isUser
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/add",
    verifyToken,
    isUser,
    addToCart
);

router.get(
    "/",
    verifyToken,
    isUser,
    getCart
);

router.put(
    "/update",
    verifyToken,
    isUser,
    updateCartItem
);

router.delete(
    "/remove/:productId",
    verifyToken,
    isUser,
    removeCartItem
);

router.delete(
    "/clear",
    verifyToken,
    isUser,
    clearCart
);

export default router;