import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import { seedInitialProducts } from './services/productService';
import cartRoute from './routes/cartRoute';

const app =express()
const port =3001;

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=> console.log('conected'))
.catch((err)=>console.log("filled to conect",err));

seedInitialProducts()

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.listen(port, ()=>{
    console.log(`السيرفر يعمل على: http://localhost:${port}`)
})

