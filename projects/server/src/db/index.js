import mongoose from "mongoose";

const connectDB = async () => {
    console.log(process.env.MONGODB_URL)
    try{
        const con= await mongoose.connect(`${process.env.MONGODB_URL}/nodeAssesment`);
        console.log(`MongoDB connected: ${con.connection.host}`); 
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;