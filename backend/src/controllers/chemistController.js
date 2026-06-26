import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const getChemistProfile = async (req, res) => {
    try {
        const chemist = await db
            .collection("chemists")
            .findOne(
                {
                    _id: new ObjectId(req.user.id)
                },
                {
                    projection: {
                        password: 0
                    }
                }
            );

        res.status(200).json(chemist);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};