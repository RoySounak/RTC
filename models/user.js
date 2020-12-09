const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required: true
    },
    user_email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("User",userSchema)