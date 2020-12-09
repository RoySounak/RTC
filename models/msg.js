const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const msgSchema = new mongoose.Schema({
    msg_content:{
        type:String,
        required: true
    },
    msg_by:{
        type:ObjectId,
        ref:"User" 
    }
})

mongoose.model("Msg",msgSchema)