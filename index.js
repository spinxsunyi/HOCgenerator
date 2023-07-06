const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const mongoString = process.env.DATABASE_URL

// connect to database
mongoose.connect(mongoString)
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error) 
})
database.once('connected', () => {
    console.log('connected database');
})

// Declare app by express
const app = express();
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

// Set EJS as view engine
app.set('view engine', 'ejs');

// Importing all required routes
const HOCRoute = require('./routes/HOCRoute')

app.use('/', HOCRoute);
// ?? findout how the app.use is working?

app.listen(3001, ()=>{
    console.log(`server started at 3001`)
})