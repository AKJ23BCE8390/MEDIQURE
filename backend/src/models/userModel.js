import {db} from "../config/db.js"

const usersCollection=db.collection("users");

export const createUser=async(userData)=>{
    return await usersCollection.insertOne(userData);
};

export const findUserByEmail=async (email)=>{
    return await usersCollection.findOne({email});
};

export const findUserById=async(id)=>{
    return await usersCollection.findOne({_id: id});
};