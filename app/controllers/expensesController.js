const Expense= require('../models/expense')

module.exports.create=(req,res)=>{
    const expense = new Expense(req.body)
    expense.user=req.user._id
    expense.save()
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.list=(req,res)=>{
    const user=req.user._id
    Expense.find({user}).populate('category')
    .then((expense)=>{
        res.json(expense)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.update=(req,res)=>{
    const id = req.params.id 
    const expense = req.body
    Expense.findOneAndUpdate({_id:id,user:req.user._id},expense, { new: true, runValidators: true }).populate('category')
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.destroy=(req,res)=>{
    const id = req.params.id
    Expense.deleteMany({_id:id,user:req.user._id})
        .then((expense) => {
            if(expense) {
                res.json(expense)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json({errors:err})
        })
}