import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("\nmongoDB connected");
    }
    catch (error) {
        console.error("MONGODB CONNECTION FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB