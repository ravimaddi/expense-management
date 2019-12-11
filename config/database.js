const mongoose = require('mongoose')
const connectDB = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
    mongoose.Promise=global.Promise
    
    const CONNECTION_URI= `mongodb://ravimaddi:RamveerMaddi@cluster0-shard-00-00-kzlrr.mongodb.net:27017,cluster0-shard-00-01-kzlrr.mongodb.net:27017,cluster0-shard-00-02-kzlrr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
 
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}
module.exports = connectDB