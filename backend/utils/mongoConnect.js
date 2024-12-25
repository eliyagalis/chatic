import mongoose from "mongoose";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 8080

export const dbConnect = async (app) => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected`);

        app.listen(PORT, () => {
            console.log("server is running on PORT: " + PORT)
        })
    } catch (error) {
        console.log("MongoDB connection error:", error)
    }
}