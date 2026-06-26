import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export const registerDeliveryBoy =
    async (req, res) => {
        try {
            const {
                name,
                email,
                password,
                phone,
                vehicleType,
                vehicleNumber
            } = req.body;

            const deliveryBoys =
                db.collection(
                    "deliveryBoys"
                );

            const existing =
                await deliveryBoys.findOne(
                    {
                        email
                    }
                );

            if (existing) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Delivery boy already exists"
                    });
            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            await deliveryBoys.insertOne(
                {
                    name,
                    email,
                    phone,

                    password:
                        hashedPassword,

                    vehicleType,
                    vehicleNumber,

                    role:
                        "deliveryBoy",

                    isAvailable:
                        true,

                    currentLocation:
                        {
                            latitude:
                                null,
                            longitude:
                                null
                        },

                    createdAt:
                        new Date()
                }
            );

            res.status(201).json({
                message:
                    "Delivery boy registered successfully"
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message
            });
        }
    };