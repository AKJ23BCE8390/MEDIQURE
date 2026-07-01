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

import { verifyToken } from "../middleware/authMiddleware.js";
import { isChemist } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===========================================
   Upload Image Only (Optional)
=========================================== */

router.post(
    "/upload-image",
    verifyToken,
    isChemist,
    uploadProductImage.single("image"),
    uploadImage
);

/* ===========================================
   Add Product
=========================================== */

router.post(
    "/",
    verifyToken,
    isChemist,
    uploadProductImage.single("image"),
    addProduct
);

/* ===========================================
   My Products
=========================================== */

router.get(
    "/my-products",
    verifyToken,
    isChemist,
    getChemistProducts
);

/* ===========================================
   Search & Filter
=========================================== */

router.get(
    "/search",
    searchProducts
);

router.get(
    "/filter",
    filterProducts
);

/* ===========================================
   Inventory
=========================================== */

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

/* ===========================================
   All Products
=========================================== */

router.get(
    "/",
    getAllProducts
);

/* ===========================================
   Update Product
=========================================== */

router.put(
    "/:id",
    verifyToken,
    isChemist,
    uploadProductImage.single("image"),
    updateProduct
);

/* ===========================================
   Delete Product
=========================================== */

router.delete(
    "/:id",
    verifyToken,
    isChemist,
    deleteProduct
);

/* ===========================================
   Single Product
=========================================== */

router.get(
    "/:id",
    getSingleProduct
);

export default router;