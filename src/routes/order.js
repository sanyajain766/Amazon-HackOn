const express = require('express')
const Qr = require('qrcode')

const Order = require('../models/order')
const Product = require('../models/product')
const router = new express.Router()
const auth = require('../middleware/auth')
const algorithm = require('../utils/rerouter')


router.post('/buyProduct',auth,async(req,res)=>{
    req.body.orderedBy=req.user.id
    const order  = new Order(req.body)
    try{
        product= await Product.findOne({_id:req.body.productId}) 
        product.quantity=product.quantity-order.quantity
        Qr.toDataURL('localhost:3001/order'+req.user.id,(err,src)=>{
            if(err) console.log('There is an error')
            else
            order.qr=src
        })
        await product.save()
        await order.save()
        res.status(201).send({order})
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/order',auth,async(req,res)=>{
    try{
        const order =await Order.find({orderedBy:req.user.id})
        var result=[]
        for(var i=0;i<order.length;i++){
            var product = await Product.findOne({_id:order[i].productId})
            var orderDetails = order[i]
            result.push({product,orderDetails})
        }
        
        
        res.status(200).send(result)
    }
    catch(e){
        res.send(e.message)
    }
})
router.get('/order/:id',auth,async(req,res)=>{
    try{
        const order= await Order.find({_id:req.params.id})
        if(!order) return res.status(400).send()
        return res.status(200).send(order)
    }
    catch(e){
        return res.status(500).send()
    }
})
router.post('/updateOrder',async(req,res)=>{
    try{
        var order= await Order.findOne({id:req.body.id})
        order.shippingAddress=req.body.shippingAddress
        order.shippingCity = req.body.shippingCity
        const obj = algorithm(order.currCity,order.status,req.body.shippingCity)
        if(obj.path.length>0) {
            await order.save()
        }

        res.status(200).send(order)
    }
    catch(e){
          res.status(400).send(e.message)
    }
})

module.exports = router