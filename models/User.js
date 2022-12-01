import mongoose from "mongoose";

// CREATING USER MODEL(SCHEMA)
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
// REGISTERING OUR userSchema MODEL
mongoose.model("User",userSchema)