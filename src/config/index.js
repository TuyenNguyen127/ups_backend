const dotenv = require('dotenv')
dotenv.config()

const config = {
    mongodbUri:
    'mongodb+srv://admin:abc12345@cluster0.mmi1upr.mongodb.net/ups',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secret',
}

module.exports = { config }
