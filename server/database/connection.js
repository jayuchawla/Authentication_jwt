import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';


export default async function connect() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(uri);
    console.log("Database connected...!");
    return db;
}