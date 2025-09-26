const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const ejs = require('ejs')
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const cors = require("cors")
app.use(cors())
dotenv.config()
const customerRouter = require ('./routes/user.route')

app.use(express.json());
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

let allCustomers = []

app.use("/user", customerRouter);

const port = process.env.PORT || 4565 ;

app.listen(port, () => {
    // console.log('App has started already');
    console.log( `App has started already at ${port}` );
    
});
