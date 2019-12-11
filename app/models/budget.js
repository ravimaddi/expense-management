const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const budgetSchema=new Schema({
    budget:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
   
})
const Budget = mongoose.model('Budget',budgetSchema)
module.exports=Budget