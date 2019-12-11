const Budget = require('../models/budget')

module.exports.createBudget=(req,res)=>{
    const {body }= req
    const budget= new Budget(body)
    budget.user=req.user._id
    budget.save()
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.showBudget=(req,res)=>{
    Budget.findOne({user:req.user._id})
    .then((response)=>{
        if(!response){
            res.json({})
        }
        res.json(response)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.updateBudget=(req,res)=>{
    const id = req.params.id 
    const body = req.body 
    Budget.findOneAndUpdate({_id:id,user:req.user._id}, body, { new: true, runValidators: true })
        .then((budget) => {
            if(budget) {
                res.json(budget)
            } 
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json({errors:err})
        })
}