import express from "express";

import { getProfile } from "../controllers/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

import { isUser } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/profile",
    verifyToken,
    isUser,
    getProfile
);

export default router;