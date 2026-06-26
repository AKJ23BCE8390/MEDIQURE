import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

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
      image,
      expiryDate,
    } = req.body;

    const result = await db.collection("products").insertOne({
      chemistId: req.user.id,

      name,

      brand,

      category,

      description,

      price: Number(price),

      stock: Number(stock),

      prescriptionRequired,

      image,

      expiryDate: expiryDate ? new Date(expiryDate) : null,

      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Product added successfully",

      productId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChemistProducts = async (req, res) => {
  try {
    const products = await db
      .collection("products")
      .find({
        chemistId: req.user.id,
      })
      .toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
    name,
    brand,
    category,
    description,
    price,
    stock,
    prescriptionRequired,
    image,
    expiryDate
} = req.body;

    const result = await db.collection("products").updateOne(
      {
        _id: new ObjectId(id),
        chemistId: req.user.id,
      },
      {
        $set: {
          name,
          brand,
          category,
          description,

          price: Number(price),

          stock: Number(stock),

          prescriptionRequired,

          image,
          expiryDate:
    expiryDate
        ? new Date(
              expiryDate
          )
        : null,

          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
      chemistId: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await db
      .collection("products")
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      message: "Image uploaded successfully",

      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Search query required",
      });
    }

    const products = await db
      .collection("products")
      .find({
        name: {
          $regex: q,
          $options: "i",
        },
      })
      .limit(20)
      .toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const products = await db.collection("products").find(filter).toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInventoryStats = async (req, res) => {
  try {
    const chemistId = req.user.id;

    const products = await db
      .collection("products")
      .find({
        chemistId,
      })
      .toArray();

    const totalProducts = products.length;

    const lowStock = products.filter(
      (product) => product.stock > 0 && product.stock <= 10,
    ).length;

    const outOfStock = products.filter((product) => product.stock === 0).length;

    res.status(200).json({
      totalProducts,
      lowStock,
      outOfStock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChemistAnalytics = async (req, res) => {
  try {
    const chemistId = req.user.id;

    const orders = await db
      .collection("orders")
      .find({
        "items.chemistId": chemistId,
      })
      .toArray();

    let totalRevenue = 0;

    let totalOrders = 0;

    let totalProductsSold = 0;

    orders.forEach((order) => {
      totalOrders++;

      order.items.forEach((item) => {
        if (item.chemistId === chemistId) {
          totalRevenue += item.subtotal;

          totalProductsSold += item.quantity;
        }
      });
    });

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalProductsSold,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpiryProducts =
    async (req, res) => {
        try {

            const chemistId =
                req.user.id;

            const next30Days =
                new Date();

            next30Days.setDate(
                next30Days.getDate() +
                30
            );

            const products =
                await db
                    .collection(
                        "products"
                    )
                    .find({
                        chemistId,

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

            res.status(200).json(
                products
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });
        }
    };