import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const getProfile = async (req, res) => {
    try {
        const db = db();

        const user = await db
            .collection("users")
            .findOne(
                { _id: new ObjectId(req.user.id) },
                { projection: { password: 0 } }
            );

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};