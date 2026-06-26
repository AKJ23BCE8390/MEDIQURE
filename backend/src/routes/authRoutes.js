import express from "express";

import {
    registerUser,
    loginUser,
    registerChemist,
    loginChemist,
    registerDeliveryBoy,
    loginDeliveryBoy,
    loginAdmin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.post("/chemist/register", registerChemist);
router.post("/chemist/login", loginChemist);

router.post("/delivery/register", registerDeliveryBoy);
router.post("/delivery/login", loginDeliveryBoy);

router.post("/admin/login", loginAdmin);

export default router;