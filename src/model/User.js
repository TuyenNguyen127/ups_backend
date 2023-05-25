const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        default: 'User',
    },
    email: {
        type: String,
        require: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = User = mongoose.model('User', UserSchema)
