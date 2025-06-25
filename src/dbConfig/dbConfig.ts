import mongoose from "mongoose";

export default async function connect() {
    try {
        
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Mongo DB connected successflly");
        })
        connection.on('error',(err)=>{
            console.log("Mongo DB connection was failed, Please make sure DB is running", err);
            process.exit();
        })
    } catch (error) {
        console.log("Mongo connection failed !......");
        console.error(error);
    }
    
}