const mongoose = require('mongoose');

const shoesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    size:{
        type:Number
    },
    photo:{
        type: String,
        required:true
    }

})

const Shoes = mongoose.model("Shoes",shoesSchema)

module.exports = Shoes