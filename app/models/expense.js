const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema=new Schema({   
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true,
        minlength:1
        },
    item:{
        type:String,
        required:true
        },
    amount:{
        type:Number,
        required:true
    },
    expenseDate:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    isdelete:{
        type:Boolean,
        default:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
})

expenseSchema.post('save',function(expense,next){
        expense.populate('category').execPopulate().then(function() {
            next();
          });
    
})

const Expense = mongoose.model('Expense',expenseSchema)
module.exports=Expense

