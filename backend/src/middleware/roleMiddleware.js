export const isUser = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    next();
};

export const isChemist = (req, res, next) => {
    if (req.user.role !== "chemist") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    next();
};

export const isDeliveryBoy = (
    req,
    res,
    next
) => {
    if (
        req.user.role !==
        "deliveryBoy"
    ) {
        return res.status(403).json({
            message:
                "Access denied"
        });
    }

    next();
};

export const isAdmin = (
    req,
    res,
    next
) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    next();
};