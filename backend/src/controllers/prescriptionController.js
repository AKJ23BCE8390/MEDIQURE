import { db }
from "../config/db.js";

export const uploadPrescriptionFile =
    async (
        req,
        res
    ) => {
        try {
            if (!req.file) {
                return res
                    .status(400)
                    .json({
                        message:
                            "No file uploaded"
                    });
            }

            const result =
                await db
                    .collection(
                        "prescriptions"
                    )
                    .insertOne({
                        userId:
                            req.user.id,
                        fileUrl:
                            `/uploads/prescriptions/${req.file.filename}`,
                        status:
                            "Pending",
                        createdAt:
                            new Date()
                    });

            res.status(201).json({
                message:
                    "Prescription uploaded successfully",
                prescriptionId:
                    result.insertedId,
                fileUrl:
                    `/uploads/prescriptions/${req.file.filename}`
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };