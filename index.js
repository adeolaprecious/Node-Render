const express = require ("express");
// const express = require('express');
const app = express();
// const router = express.Router();
const dotenv = require('dotenv')
const ejs = require('ejs')
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
dotenv.config()
const customerRouter = require ('./routes/user.route')

// const customerModel = require('./models/user.model')

app.use(express.urlencoded({ extended: true }));
const URI = process.env.URI



mongoose.connect(URI)
.then(() => {
    console.log("Connected to MongoDB"); 
}).
catch((err) => {
    console.log("MongoDB connection error:", err);
})


// let customerModel = mongoose.model('Customer', customerSchema);

allCustomers = []

app.use("/user", customerRouter);

const port = process.env.PORT || 4565 ;

app.listen(port, () => {
    console.log('App has started already');
    
});
