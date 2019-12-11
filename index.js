const express =require('express')
const connectDb=require('./config/database')
const router =require('./config/routes')
const cors = require('cors')
const port = process.env.PORT || 3015;
connectDb()
const app=express()
app.use(express.json())
app.use(cors())
 app.use('/',router)

app.listen(port,function(){
    console.log('listening on the port',port)
})