const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then (()=>{
    console.log('Connect Success')
})
.catch((error)=>{
console.log(error)
})