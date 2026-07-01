import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const addAddress = async (req, res) => {
    try {
        const {
    fullName,
    phone,
    house,
    street,
    landmark,
    city,
    state,
    pincode,
    latitude,
    longitude,
    addressType,
    isDefault
} = req.body;

        const userId = new ObjectId(req.user.id);

        const user = await db.collection("users").findOne({
            _id: userId
        });

        if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

const addresses = user.addresses || [];

        if (isDefault) {
            addresses.forEach(address => {
                address.isDefault = false;
            });
        }

        const newAddress = {
    _id: new ObjectId(),

    fullName,

    phone,

    house,

    street,

    landmark,

    city,

    state,

    pincode,

    latitude,

    longitude,

    addressType,

    isDefault:
        addresses.length === 0
            ? true
            : isDefault || false,

    createdAt: new Date(),

    updatedAt: new Date()
};

        addresses.push(newAddress);

        await db.collection("users").updateOne(
            {
                _id: userId
            },
            {
                $set: {
                    addresses
                }
            }
        );

        res.status(201).json({
            message: "Address added successfully",
            address: newAddress
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const user = await db.collection("users").findOne(
            {
                _id: new ObjectId(req.user.id)
            },
            {
                projection: {
                    addresses: 1
                }
            }
        );

        res.status(200).json(
            user?.addresses || []
        );

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;

       const {
    fullName,
    phone,
    house,
    street,
    landmark,
    city,
    state,
    pincode,
    latitude,
    longitude,
    addressType,
    isDefault
} = req.body;

        const user = await db.collection("users").findOne({
            _id: new ObjectId(req.user.id)
        });
        if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

        const updatedAddresses =
            user.addresses.map(address => {
                if (
                    address._id.toString() ===
                    addressId
                ) {
                    return {
    ...address,

    fullName,

    phone,

    house,

    street,

    landmark,

    city,

    state,

    pincode,

    latitude,

    longitude,

    addressType,

    isDefault,

    updatedAt: new Date()
};
                }

                if (isDefault) {
                    return {
                        ...address,
                        isDefault: false
                    };
                }

                return address;
            });

        await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.user.id)
            },
            {
                $set: {
                    addresses: updatedAddresses
                }
            }
        );

        res.status(200).json({
            message: "Address updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteAddress = async (req, res) => {
    
    try {
        const user = await db.collection("users").findOne({
    _id: new ObjectId(req.user.id)
});

if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
        const { addressId } = req.params;

        await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.user.id)
            },
            {
                $pull: {
                    addresses: {
                        _id: new ObjectId(addressId)
                    }
                }
            }
        );

        res.status(200).json({
            message: "Address deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const setDefaultAddress = async (req, res) => {

    try {

        const { addressId } = req.params;

        const user =
            await db.collection("users").findOne({
                _id: new ObjectId(req.user.id)
            });

        if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

        const updatedAddresses =
            user.addresses.map(address => ({
                ...address,
                isDefault:
                    address._id.toString() === addressId
            }));

        await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.user.id)
            },
            {
                $set: {
                    addresses: updatedAddresses
                }
            }
        );

        res.json({
            message: "Default address updated"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};