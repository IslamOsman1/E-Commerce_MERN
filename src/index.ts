import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute';

const app =express()
const port =3001;

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=> console.log('conected'))
.catch((err)=>console.log("filled to conect",err));

app.use('/user',userRoute)
app.listen(port, ()=>{
    console.log(`السيرفر يعمل على: http://localhost:${port}`)
})

