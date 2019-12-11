const User = require('../models/user')

module.exports.register=(req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
    .then((user)=>{
        const {_id,username,email}=user
        res.json({_id,username,email})   
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.login=(req,res)=>{
    let user
    User.findByCredentials(req.body.email,req.body.password)
    .then((response)=>{
        user=response
       return user.generateToken()
    })
    .then((token)=>{
        res.json({user,token})
    })
    .catch((err)=>{
     res.json(err)
    })
    
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.account = (req,res) => { 
    const {_id,name,email,mobile,image} = req.user
    res.json({_id,name,email,mobile,image})
}

module.exports.logout=(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(()=>{
        res.json('Succesfully logged out')
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.image=(req,res)=>{
    const {user}=req
    user.image=req.file.location
    User.findByIdAndUpdate(user._id,user,{ new: true, runValidators: true })
    .then((response)=>{
        const {_id,name,email,mobile,image} =response
        res.json({_id,name,email,mobile,image})
        
    })
    .catch((err)=>{
        res.json(err)
    })
}



    

