const customerModel = require("../models/user.model")
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs")
const jwt = require ("jsonwebtoken")
// let allCustomers = []

exports.getSignup = (req, res) => {
    res.render('signUp')
}

exports.postRegister = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    console.log(req.body);
    // console.log("Request Body:",req.body);
    // res.send('confirmed')
    // allCustomers.push(req.body)
    let newCustomer = new customerModel(req.body);
    newCustomer.save()
        .then(() => {
            newCustomer.password = hashedPassword;
            console.log("customer registered successfully");

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'adeolaprecious006@gmail.com',
                    // pass: 'kbiicbpfnqqrdtct'
                    // pass: 'pyikqamlukuhzzbj'
                    pass: 'kdvdqjizhznxtxcl'
                }
            });
            let mailOptions = {
                from: 'adeolaprecious006@gmail.com',
                to: [req.body.email, 'davidexcel2304@gmail.com', 'adeoladebowale24@gmail.com'],
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
                       <h2 style="color: #333;">Hello ${req.body.fullName || "User"}, 👋</h2>
                       <p style="font-size: 16px; color: #555;">
                            Thank you for signing up! Your account has been created successfully.
                        </p>
                    </div>
  `
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.redirect('/user/signIn');
        })
        .catch((err) => {
            console.error("Error registering customer:", err);
        });
}

exports.getSignin = (req, res) => {
    res.render('signIn')
}

exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    // res.send('confirmed again')
    console.log("Login form submitted data", req.body);

    customerModel.findOne({ email })
        .then((foundCustomer) => {
            if (!foundCustomer) {
                console.log("Invalid email");
                return res.status(400).json({ message: "Invalid email or password" })
            }

            const isMatch = bcrypt.compareSync(password, foundCustomer.password);
            if (!isMatch) {
                console.log("Invalid password");
                return res.status(400).json({ message: "Invalid email or password" });
            }
                console.log("Login successfull for:", foundCustomer.email);
                // const token = jwt.sign({ email: req.body.email}, "secretkey", {expiresIn: "1h"});
                const token = jwt.sign({ email: req.body.email }, "secretkey", { expiresIn: "7d" });
                console.log("Generated JWT:", token);
                
                return res.json({
                    message: "Login successful",
                    user: {
                        id: foundCustomer._id,
                        fullName: foundCustomer.fullName,
                        email: foundCustomer.email,
                        token: token
                    }
                })

        })
        .catch((err) => {
            console.error();
            ("Error logging in:", err);
            res.status(500).json({ message: "Internal server error" })
        });
};

// exports.getDashboard = (req, res) => {
  
//     customerModel.find()
//         .then((data) => {
//             console.log(data);
//             allCustomers = data;
//             res.render('index', { allCustomers });
//         })
//         .catch((err) => {
//             console.error("Error fetching customers:", err);
//             res.status(500).send("Internal Server Error");
//         });
// };

exports.getDashboard =(req, res)=>{
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify( token, "secretkey", (err, result) => {
        if(err){
            console.log(err);
            res.send({status: false, message: "Token is expired or invalid"})     
        }else{
            console.log(result);
            let email = result.email
            customerModel.findOne({email: email})
                .then((foundCustomer)=>{
                    res.send({status: true, message: "token is valid", foundCustomer})
                })

            
        }
    });

    
}
