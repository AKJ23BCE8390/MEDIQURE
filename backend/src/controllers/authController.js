import bcrypt from "bcryptjs";
import { db } from "../config/db.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const users = db.collection("users");

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await users.insertOne({
            name,
            email,
            phone,
            password: hashedPassword,
            role: "user",
            createdAt: new Date(),
        });

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = db.collection("users");

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken({
            id: user._id,
            role: user.role
        });

        res.status(200).json({
            token,
            role: user.role,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const registerChemist = async (req, res) => {
    try {
        const {
            shopName,
            ownerName,
            email,
            password,
            licenseNumber,
            phone,
            address,
        } = req.body;

        const chemists =
            db.collection("chemists");

        const existingChemist =
            await chemists.findOne({
                email
            });

        if (existingChemist) {
            return res.status(400).json({
                message:
                    "Chemist already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        await chemists.insertOne({
            shopName,
            ownerName,
            email,

            password:
                hashedPassword,

            licenseNumber,
            phone,
            address,

            role: "chemist",

            approvalStatus:
                "Pending",

            isApproved:
                false,

            createdAt:
                new Date(),
        });

        res.status(201).json({
            message:
                "Chemist registered successfully. Waiting for admin approval.",
        });

    } catch (error) {
        res.status(500).json({
            message:
                error.message,
        });
    }
};

export const loginChemist = async (req, res) => {
    try {

        const { email, password } = req.body;

        const chemists =
            db.collection("chemists");

        const chemist =
            await chemists.findOne({
                email
            });

        if (!chemist) {
            return res.status(404).json({
                message:
                    "Chemist not found"
            });
        }

        const match =
            await bcrypt.compare(
                password,
                chemist.password
            );

        if (!match) {
            return res.status(401).json({
                message:
                    "Invalid credentials"
            });
        }

        if (!chemist.isApproved) {
            return res.status(403).json({
                message:
                    "Your account is pending admin approval"
            });
        }

        const token =
            generateToken({
                id: chemist._id,
                role: chemist.role
            });

        res.status(200).json({
            token,
            role: chemist.role,

            chemist: {
                id: chemist._id,
                shopName:
                    chemist.shopName,
                email:
                    chemist.email,
                approvalStatus:
                    chemist.approvalStatus
            }
        });

    } catch (error) {
        res.status(500).json({
            message:
                error.message
        });
    }
};

export const loginDeliveryBoy =
    async (req, res) => {
        try {

            const {
                email,
                password
            } = req.body;

            const deliveryBoy =
                await db
                    .collection(
                        "deliveryBoys"
                    )
                    .findOne({
                        email
                    });

            if (!deliveryBoy) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Delivery boy not found"
                    });
            }

            const match =
                await bcrypt.compare(
                    password,
                    deliveryBoy.password
                );

            if (!match) {
                return res
                    .status(401)
                    .json({
                        message:
                            "Invalid credentials"
                    });
            }

            const token =
                generateToken({
                    id:
                        deliveryBoy._id,
                    role:
                        "deliveryBoy"
                });

            res.status(200).json({
                token,
                role:
                    "deliveryBoy",

                deliveryBoy: {
                    id:
                        deliveryBoy._id,
                    name:
                        deliveryBoy.name,
                    email:
                        deliveryBoy.email
                }
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };

export const registerDeliveryBoy = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            vehicleType,
            vehicleNumber
        } = req.body;

        const deliveryBoys = db.collection("deliveryBoys");

        const existingDeliveryBoy =
            await deliveryBoys.findOne({
                email
            });

        if (existingDeliveryBoy) {
            return res.status(400).json({
                message: "Delivery boy already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await deliveryBoys.insertOne({
            name,
            email,
            phone,

            password: hashedPassword,

            vehicleType,
            vehicleNumber,

            role: "deliveryBoy",

            isAvailable: true,

            currentLocation: {
                latitude: null,
                longitude: null
            },

            createdAt: new Date()
        });

        res.status(201).json({
            message:
                "Delivery boy registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const loginAdmin = async (
    req,
    res
) => {
    try {

        const {
            email,
            password
        } = req.body;

        const admin =
            await db
                .collection(
                    "admins"
                )
                .findOne({
                    email
                });

        if (!admin) {
            return res.status(404).json({
                message:
                    "Admin not found"
            });
        }

        const match =
            await bcrypt.compare(
                password,
                admin.password
            );

        if (!match) {
            return res.status(401).json({
                message:
                    "Invalid credentials"
            });
        }

        const token =
            generateToken({
                id:
                    admin._id,
                role:
                    "admin"
            });

        res.status(200).json({
            token,
            role:
                "admin",

            admin: {
                id:
                    admin._id,
                name:
                    admin.name,
                email:
                    admin.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message:
                error.message
        });
    }
};