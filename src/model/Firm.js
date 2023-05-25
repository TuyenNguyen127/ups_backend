const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FirmSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    url: {
        type: String,
        default: '/'
    },
    description: {
        type: String
    }
});
module.exports = Firm = mongoose.model('Firm', FirmSchema)