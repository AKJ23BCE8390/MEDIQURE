import {db} from "../config/db.js";

const productsCollection=db.collection("products");

export const createProduct= async (productData)=>{
    return await productsCollection.insertOne(productData);
};

export const getAllProducts=async()=>{
    return await productsCollection.find({}).toArray();
};

export const getProductById = async(id)=>{
    return await productsCollection.findOne({_id:id});
};