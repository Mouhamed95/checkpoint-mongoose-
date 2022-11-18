const mongoose = require('mongoose');
const Schema = mongoose.Schema




const blogSchema = new Schema ({
    name: {
        type : String,
        required: true
    },
    age : Number,
    favoriteFoods : [String]
})
module.exports = mongoose.model("Blog", blogSchema)