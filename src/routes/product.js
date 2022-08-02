const express = require('express')
const Product = require('../models/product')
const Order = require('../models/order')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

router.post('/listProduct',async(req,res)=>{
    const product  = new Product(req.body)
    try{
        await product.save()
        res.status(201).send({product})
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/product',async(req,res)=>{
    try{
        const products = await Product.find({$and:[{quantity:{$gt:0}},{quantity:{$lt:60}}]})
    res.status(200).send(products)
    }
    catch(e){
          res.status(500).send()
    }
})
router.patch('/updateStatus',async(req,res)=>{
    try{
        const order = await Order.findOne({_id:req.body.id})
        order.currCity=req.body.currCity
        order.status=req.body.status
        order.step=req.body.step
        await order.save()
        res.status(200).send(order)
    }
    catch(e){
        res.status(400).send(e)
    }
})
module.exports = router