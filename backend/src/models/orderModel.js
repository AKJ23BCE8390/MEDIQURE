import { db } from "../config/db.js";

const ordersCollection = db.collection("orders");

export const createOrder = async (orderData) => {
    return await ordersCollection.insertOne(orderData);
};

export const getOrdersByUser = async (userId) => {
    return await ordersCollection.find({ userId }).toArray();
};