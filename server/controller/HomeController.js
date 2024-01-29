const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const database=require('./db')

const user=require('./model')
const info=require('./modelInfo')

const app=express()


app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000')
})
