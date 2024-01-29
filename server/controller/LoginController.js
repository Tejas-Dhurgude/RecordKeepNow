const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const database=require('./db')

const user=require('./model')
const info=require('./modelInfo')

const app=express()


app.use(cors())
app.post('/login',async (req,res)=>{

    try{
    const email=req.body.email
    const password=req.body.password

    let arr=await user.find({email:email},{password:1,_id:0})
    if(arr.length==0){
        res.json("false")
    }
    else if(arr[0].password==password){
        res.json("true")
    }
    else{
        res.json("false")
    }
}
catch(err){
    console.log(err)
}

})



app.listen(5000,()=>{
    console.log('Server is listening on port 5000')
})
