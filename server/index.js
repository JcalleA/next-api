const express = require('express')
const productsRouter=require('./routers/products.router')
const cors = require('cors')
const app=express()
const PORT= process.env.PORT || 4000;


app.use(cors())


app.use("/products",productsRouter)



app.listen(PORT)
console.log('====================================');
console.log('server on port ',PORT);
console.log('====================================');