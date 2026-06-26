import express from "express";

import { getChemistProfile }
from "../controllers/chemistController.js";

import { verifyToken }
from "../middleware/authMiddleware.js";

import { isChemist }
from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/profile",
    verifyToken,
    isChemist,
    getChemistProfile
);

export default router;