const Category= require('../models/category')

module.exports.createCategory=(req,res)=>{
    const {body }= req
    const category= new Category(body)
    category.user=req.user._id
    category.save()
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({errors:err})
    })  
}

module.exports.showCategory=(req,res)=>{
    const user=req.user._id
    Category.find({user})
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.updateCategory=(req,res)=>{
    const id = req.params.id 
    const category = req.body
    Category.findOneAndUpdate({_id:id,user:req.user._id},category, { new: true, runValidators: true })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({errors:err})
    })

}

module.exports.destroyCategory=(req,res)=>{
    const id = req.params.id
    Category.findOneAndDelete({_id:id,user:req.user._id})
        .then((category) => {
            if(category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json({errors:err})
        })
}

