import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

/* =========================================
   Add Product
========================================= */

export const addProduct = async (req, res) => {

    try {

        const {
            name,
            brand,
            category,
            description,
            price,
            stock,
            prescriptionRequired,
            expiryDate
        } = req.body;

        const image = req.file
            ? req.file.path
            : "";

        if (
            !name ||
            !brand ||
            !category ||
            !price ||
            stock === undefined
        ) {

            return res.status(400).json({
                message: "Please fill all required fields."
            });

        }

        const result =
            await db.collection("products").insertOne({

                chemistId: req.user.id,

                name: name.trim(),

                brand: brand.trim(),

                category: category.trim(),

                description: description || "",

                price: Math.max(
                    0,
                    Number(price)
                ),

                stock: Math.max(
                    0,
                    Number(stock)
                ),

                prescriptionRequired:
                    prescriptionRequired === true ||
                    prescriptionRequired === "true",

                image,

                expiryDate:
                    expiryDate
                        ? new Date(expiryDate)
                        : null,

                createdAt: new Date(),

                updatedAt: new Date()

            });

        res.status(201).json({

            message: "Product added successfully.",

            productId: result.insertedId

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

/* =========================================
   Get Chemist Products
========================================= */

export const getChemistProducts =
    async (req, res) => {

        try {

            const products =
                await db.collection("products")
                    .find({

                        chemistId:
                            req.user.id

                    })
                    .sort({
                        createdAt: -1
                    })
                    .toArray();

            res.json(products);

        }

        catch (error) {

            res.status(500).json({

                message: error.message

            });

        }

    };

/* =========================================
   Get Single Product
========================================= */

export const getSingleProduct =
    async (req, res) => {

        try {

            const product =
                await db.collection("products")
                    .findOne({

                        _id:
                            new ObjectId(req.params.id)

                    });

            if (!product) {

                return res.status(404).json({

                    message:
                        "Product not found"

                });

            }

            res.json(product);

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

/* =========================================
   Get All Products
========================================= */

export const getAllProducts =
    async (req, res) => {

        try {

            const products =
                await db.collection("products")
                    .find({})
                    .sort({
                        createdAt: -1
                    })
                    .toArray();

            res.json(products);

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };
    /* =========================================
   Update Product
========================================= */

export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const existingProduct =
            await db.collection("products").findOne({

                _id: new ObjectId(id),

                chemistId: req.user.id

            });

        if (!existingProduct) {

            return res.status(404).json({

                message: "Product not found."

            });

        }

        const {
            name,
            brand,
            category,
            description,
            price,
            stock,
            prescriptionRequired,
            expiryDate
        } = req.body;

        const image =
            req.file
                ? req.file.path
                : existingProduct.image;

        await db.collection("products").updateOne(

            {

                _id: new ObjectId(id),

                chemistId: req.user.id

            },

            {

                $set: {

                    name: name?.trim(),

                    brand: brand?.trim(),

                    category: category?.trim(),

                    description,

                    price: Math.max(
                        0,
                        Number(price)
                    ),

                    stock: Math.max(
                        0,
                        Number(stock)
                    ),

                    prescriptionRequired:
                        prescriptionRequired === true ||
                        prescriptionRequired === "true",

                    expiryDate:
                        expiryDate
                            ? new Date(expiryDate)
                            : null,

                    image,

                    updatedAt: new Date()

                }

            }

        );

        res.json({

            message: "Product updated successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

/* =========================================
   Delete Product
========================================= */

export const deleteProduct = async (req, res) => {

    try {

        const result =
            await db.collection("products").deleteOne({

                _id:
                    new ObjectId(req.params.id),

                chemistId:
                    req.user.id

            });

        if (!result.deletedCount) {

            return res.status(404).json({

                message: "Product not found."

            });

        }

        res.json({

            message: "Product deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

/* =========================================
   Upload Product Image
========================================= */

export const uploadImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                message: "No image uploaded."

            });

        }

        res.json({

            message: "Image uploaded successfully.",

            imageUrl: req.file.path

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

/* =========================================
   Search Products
========================================= */

export const searchProducts = async (req, res) => {

    try {

        const { q } = req.query;

        if (!q) {

            return res.status(400).json({

                message: "Search query required."

            });

        }

        const products =
            await db.collection("products")
                .find({

                    $or: [

                        {

                            name: {

                                $regex: q,

                                $options: "i"

                            }

                        },

                        {

                            brand: {

                                $regex: q,

                                $options: "i"

                            }

                        },

                        {

                            category: {

                                $regex: q,

                                $options: "i"

                            }

                        }

                    ]

                })

                .limit(25)

                .toArray();

        res.json(products);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
/* =========================================
   Filter Products
========================================= */

export const filterProducts = async (req, res) => {

    try {

        const {
            category,
            brand,
            minPrice,
            maxPrice,
            prescriptionRequired
        } = req.query;

        const filter = {};

        if (category)
            filter.category = category;

        if (brand)
            filter.brand = brand;

        if (prescriptionRequired) {

            filter.prescriptionRequired =
                prescriptionRequired === "true";

        }

        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice)
                filter.price.$gte =
                    Number(minPrice);

            if (maxPrice)
                filter.price.$lte =
                    Number(maxPrice);

        }

        const products =
            await db.collection("products")
                .find(filter)
                .sort({
                    createdAt: -1
                })
                .toArray();

        res.json(products);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

/* =========================================
   Inventory Statistics
========================================= */

export const getInventoryStats =
    async (req, res) => {

        try {

            const LOW_STOCK_LIMIT = 10;

            const products =
                await db.collection("products")
                    .find({

                        chemistId:
                            req.user.id

                    })
                    .toArray();

            const totalProducts =
                products.length;

            const lowStock =
                products.filter(

                    product =>
                        product.stock > 0 &&
                        product.stock <= LOW_STOCK_LIMIT

                ).length;

            const outOfStock =
                products.filter(

                    product =>
                        product.stock === 0

                ).length;

            const totalStockValue =
                products.reduce(

                    (sum, product) =>

                        sum +
                        (
                            product.price *
                            product.stock
                        ),

                    0

                );

            res.json({

                totalProducts,

                lowStock,

                outOfStock,

                totalStockValue

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

/* =========================================
   Chemist Analytics
========================================= */

export const getChemistAnalytics =
    async (req, res) => {

        try {

            const chemistId =
                req.user.id;

            const orders =
                await db.collection("orders")
                    .find({

                        "items.chemistId":
                            chemistId,

                        status: "Delivered"

                    })
                    .toArray();

            let totalRevenue = 0;

            let totalOrders = 0;

            let totalProductsSold = 0;

            orders.forEach(order => {

                totalOrders++;

                order.items.forEach(item => {

                    if (
                        item.chemistId ===
                        chemistId
                    ) {

                        totalRevenue +=
                            item.subtotal;

                        totalProductsSold +=
                            item.quantity;

                    }

                });

            });

            const averageOrderValue =
                totalOrders === 0
                    ? 0
                    : (
                        totalRevenue /
                        totalOrders
                    ).toFixed(2);

            res.json({

                totalRevenue,

                totalOrders,

                totalProductsSold,

                averageOrderValue

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

/* =========================================
   Expiring Products
========================================= */

export const getExpiryProducts =
    async (req, res) => {

        try {

            const next30Days =
                new Date();

            next30Days.setDate(

                next30Days.getDate() + 30

            );

            const products =
                await db.collection("products")
                    .find({

                        chemistId:
                            req.user.id,

                        expiryDate: {

                            $ne: null,

                            $lte:
                                next30Days

                        }

                    })

                    .sort({

                        expiryDate: 1

                    })

                    .toArray();

            res.json(products);

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };