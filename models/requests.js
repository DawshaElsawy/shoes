const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
    size:{
        type:Number
    },
    address:{
        type: String,
        required: true
    },
    user:{
        type:String,
        required:true
    }
})

const Request = mongoose.model("Request",requestsSchema)

module.exports = Request