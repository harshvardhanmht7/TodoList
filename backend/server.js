import express from "express";
import connectDB  from './config/db.js'
import   cors from 'cors'
import dotenv from 'dotenv'
import  userRoutes from './routes/userRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import {notFound,errorHandler} from './middleware/errorHandler.js'

const app=express()

app.use(cors())

app.use(express.json())

dotenv.config()

connectDB()

app.use('/api/users/',userRoutes)
app.use('/api/items/',itemRoutes)


app.use(notFound)
app.use(errorHandler)



app.listen(5000,()=>{
    console.log('server is running !')
})