const mongoose = require('mongoose');

let customerSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true , unique: [true, "Email has been taken, please choose another one"]},
    password: {type: String, required: true},
    profilePicture: {type: String, default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"}
});

module.exports = mongoose.model('Customer', customerSchema);