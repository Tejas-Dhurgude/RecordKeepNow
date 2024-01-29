

const mongoose=require('mongoose')

const infoSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    itemCount:{
        type:Number,
        required:true
    },
    description:{
        type:String

    }
})

const info=new mongoose.model("infos",infoSchema)

module.exports=info