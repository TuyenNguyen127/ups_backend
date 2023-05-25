const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type:String,
        required:true
    },
    parent: {
        type:mongoose.Types.ObjectId, 
        ref:'Category',
        default: undefined
    },
    description: {
        type: String
    },
    url: {
        type: String,
        default: '/'
    }
});

module.exports = Category = mongoose.model('Category', CategorySchema)

