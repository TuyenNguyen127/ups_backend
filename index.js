const express = require('express')
// const job = require('./src/app')
const dotenv = require('dotenv')
dotenv.config()
var cors = require('cors')
const app = express()
app.set('view engine','ejs');

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

global.__basedir = __dirname;
const mongodb = require('./src/connection/mongodb')
mongodb.connect()

app.use(express.json())
app.use(cors())

const port = 8082

app.use('/', require('./src/app.routes'))

app.listen(port, () => console.log(`Listening on port ${port}`))
