const express = require('express')
const cors = require("cors");
const cookieParser=require('cookie-parser');
require('./db/mongoose')

const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const productRouter = require('./routes/product')

const app = express()

app.use(
  cors(
  //   {
  //   credentials: true,
  //  // origin:"*",
  //   optionsSuccessStatus: 200,
  // }
  )
);

const port = process.env.PORT || 3001
app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(orderRouter)
app.use(productRouter)


app.listen(port,()=>{
    console.log('Diary proj running')
})