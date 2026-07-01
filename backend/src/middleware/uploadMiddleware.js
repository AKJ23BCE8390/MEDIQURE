import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/* ===========================
   Product Image Storage
=========================== */

const productStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "medicure/products",
        resource_type: "image",
        transformation: [
            {
                width: 800,
                height: 800,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto"
            }
        ]
    })
});

/* ===========================
   Prescription Storage
=========================== */

const prescriptionStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "medicure/prescriptions",
        resource_type: "image",
        transformation: [
            {
                width: 1200,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto"
            }
        ]
    })
});

/* ===========================
   Image Validation
=========================== */

const imageFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, PNG and WEBP images are allowed."
            ),
            false
        );

    }

};

/* ===========================
   Product Upload Middleware
=========================== */

export const uploadProductImage = multer({

    storage: productStorage,

    fileFilter: imageFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});

/* ===========================
   Prescription Upload Middleware
=========================== */

export const uploadPrescription = multer({

    storage: prescriptionStorage,

    fileFilter: imageFilter,

    limits: {
        fileSize: 10 * 1024 * 1024
    }

});