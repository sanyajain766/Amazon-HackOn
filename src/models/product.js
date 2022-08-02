const mongoose = require('mongoose')
const validator = require('validator')


const productSchema = new mongoose.Schema({
    product_name:{
       type:String,
       required:true,
       trim:true
    },
    Description:{
        type:String,
        trim:true
     },
     sellarName:{
        type:String,
        trim:true,
        required:true
     },
    sellerAddress:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    product_image:{
     type:String,
     required:true
    },
    amount:{
       type:Number,
       required:true
    },
    sellerCity:{
        type:String,
        required:true,
        trim:true
    },
},{
        timestamps:true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
