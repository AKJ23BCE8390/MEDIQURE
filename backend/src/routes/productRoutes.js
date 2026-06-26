import express from "express";

import {
    addProduct,
    getChemistProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts,
    uploadImage,
    searchProducts,
    filterProducts,
    getInventoryStats,
    getChemistAnalytics,
    getExpiryProducts
} from "../controllers/productController.js";

import { uploadProductImage } from "../middleware/uploadMiddleware.js";

import { verifyToken }
from "../middleware/authMiddleware.js";

import { isChemist }
from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/upload-image",
    verifyToken,
    isChemist,
    uploadProductImage.single("image"),
    uploadImage
);

router.post(
    "/",
    verifyToken,
    isChemist,
    addProduct
);

router.get(
    "/my-products",
    verifyToken,
    isChemist,
    getChemistProducts
);

router.get(
    "/search",
    searchProducts
);

router.get(
    "/filter",
    filterProducts
);

router.get(
    "/inventory/stats",
    verifyToken,
    isChemist,
    getInventoryStats
);

router.get(
    "/analytics",
    verifyToken,
    isChemist,
    getChemistAnalytics
);

router.get(
    "/expiry",
    verifyToken,
    isChemist,
    getExpiryProducts
);

router.get(
    "/",
    getAllProducts
);

router.put(
    "/:id",
    verifyToken,
    isChemist,
    updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    isChemist,
    deleteProduct
);

router.get(
    "/:id",
    getSingleProduct
);

export default router;