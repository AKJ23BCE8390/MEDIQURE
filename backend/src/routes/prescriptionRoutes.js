import express
from "express";

import {
    uploadPrescriptionFile
}
from "../controllers/prescriptionController.js";

import {
    verifyToken
}
from "../middleware/authMiddleware.js";

import {
    isUser
}
from "../middleware/roleMiddleware.js";

import {
    uploadPrescription
}
from "../middleware/uploadMiddleware.js";

const router =
    express.Router();

router.post(
    "/upload",
    verifyToken,
    isUser,
    uploadPrescription.single(
        "prescription"
    ),
    uploadPrescriptionFile
);

export default router;