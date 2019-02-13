const mongoose = require('mongoose');

const specialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    }
})

const Special = mongoose.model("Special",specialSchema)

module.exports = Special