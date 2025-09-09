const customerModel = require ("../models/user.model")
let allCustomers =[]

exports.getSignup = (req, res) => {
    res.render('signUp')
}

exports.postRegister = (req, res) => {
    console.log(req.body);
    // res.send('confirmed')
    // allCustomers.push(req.body)
    let newCustomer = new customerModel ( req.body);
    newCustomer.save()
    .then(() => {
        res.redirect('/dashboard');
    })
    .catch((err) => {
        console.error("Error registering customer:", err);
    });
}

exports.getSignin = (req, res) => {
    res.render('signIn')
}

exports.getDashboard = ( req, res) => {
    // res.render('index', {name: 'Adeola Precious', age: 20, gender: 'Male'} );
    customerModel.find()
    .then((data)=>{
        console.log(data);
        allCustomers = data;
        res.render('index', {allCustomers});
    })
    .catch((err) => {                                                                                                                           
        console.error("Error fetching customers:", err);
        res.status(500).send("Internal Server Error");
    });
};

exports.postLogin = (req, res) => {
    res.send('confirmed again')
};




