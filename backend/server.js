import express from 'express'


const app=express()

app.get('/',(req,res)=>{
    res.send('testing app !')
})

app.listen('5000',()=>{
    console.log('server is running !')
})