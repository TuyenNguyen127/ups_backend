const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type:String, 
        required:true
    },
    description: String,
    price: {
        type: Number, 
        required: true
    },
    images: [{
        type:String
    }],
    category: {
        type:mongoose.Types.ObjectId, 
        ref:'Category',
        default: undefined
    },
    code: {
        type: String
    },
    firm:{
        type:mongoose.Types.ObjectId, 
        ref:'Firm',
        default: undefined
    },
    status: {
        type: Boolean,
        default: true
    },
    origin: {
        type: String
    },
    guarantee: {
        type: Number
    },
    wattage: {
        type: String
    },
    feature: {
        type: String
    },
    url: {
        type: String,
        default: '/'
    }
}, {
    timestamps: true,
});

module.exports = Product = mongoose.model('Product', ProductSchema);