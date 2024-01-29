const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const database=require('./db')

const user=require('./model')
const info=require('./modelInfo')

const app=express()


app.use(cors())

app.post('/signup',(req,res)=>{
    const email=req.body.email
    const password=req.body.password

    user.insertMany([{
        email:email,
        password:password
    }])
    .then(()=>{
        res.json(`email:${email},password:${password}`)
    })
    .catch(err=>{
        console.log(err)
    })

})



app.listen(5000,()=>{
    console.log('Server is listening on port 5000')
})
