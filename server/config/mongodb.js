import mongoose from "mongoose";
    

const mondbUrl = process.env.MONGODB_URI ;
if (!mondbUrl) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

const connectDB = async () => {
    try {
        
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected');
        });
        await mongoose.connect(mondbUrl);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;