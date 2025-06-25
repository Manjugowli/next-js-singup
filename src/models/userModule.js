import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password:{
        type: String,
        required:[ true, "Please provide a Password"],
    },
    email:{
        type: String,
        required:[ true, "Please provide a Email"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'viewOnly'],
        default: 'user'
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;