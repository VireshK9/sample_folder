import mongoose from "mongoose";
import { db } from "../contants.js";

const mongoConnect = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${db}`)
        console.log("MongoDB Connected Successfully !!")
    } catch (error) {
        console.error(error);
        console.log("Error in connecting DB");
    }
}
export default mongoConnect