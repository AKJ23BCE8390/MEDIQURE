import express from "express";

import {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from "../controllers/addressController.js";

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
    addAddress
);

router.get(
    "/",
    verifyToken,
    isUser,
    getAddresses
);

router.put(
    "/:addressId",
    verifyToken,
    isUser,
    updateAddress
);

router.delete(
    "/:addressId",
    verifyToken,
    isUser,
    deleteAddress
);

router.patch(
    "/:addressId/default",
    verifyToken,
    isUser,
    setDefaultAddress
);

export default router;