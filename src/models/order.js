const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { bool } = require('sharp/lib/is')

const orderSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        trim:true,
        required:true
    },
    shippingAddress:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    orderedBy:{
        type: mongoose.Schema.Types.ObjectId,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    shippingCity:{
        type:String,
        required:true,
        trim:true
    },
    qr:{
        type:String,
        
    },
    status:{
        type:String,
        required:true
    },
    step:{
        type:Number,
        required:true
    },
    currCity:{
        type:String,
        required:true,
        trim:true
    }
},{
        timestamps:true
    }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
