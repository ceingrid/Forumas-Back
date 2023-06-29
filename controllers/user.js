const uniqid = require("uniqid");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.SIGN_UP = async (req, res) => {
    try{
        const email = req.body.email;
        if (!email.includes("@")){
            return res.status(400).json({response: "Email should contain @ symbol"})
        };
        
        const password = req.body.password;
        if (password.length < 6 || !/\d/.test(password)) {
            return res.status(400).json({response: "Password should contain at least one number and be at least 6 characters long"});
        }
        
        const name = req.body.name;
        const capitalizedFirstName = name.charAt(0).toUpperCase() + name.slice(1);


        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash) => {
                
                const user = new UserModel({
                    name: capitalizedFirstName,
                    id: uniqid(),
                    password: hash,
                    email: req.body.email,
                    asked_questions_id: req.body.tickets_bought,
                });

                await user.save();

                const token = jwt.sign(
                    {
                        email: user.email,
                        id: user.id     
                    }, process.env.JWT_SECRET, 
                    {expiresIn: '2h'},
                    {algorithm: "RS256"}
                    );
            });
        });
        res.status(200).json({ response: "User was created successfully" });
        } catch (err) {
        res.status(500).json({ response: "User was not created, please try again"});
    }
};

module.exports.LOGIN = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if(!user){
            return res.status(401).json({response: "Wrong email or password, try again."});
        }

        bcrypt.compare(req.body.password, user.password, (arr, doesPasswordMatch)=>{
            if(doesPasswordMatch) {
                
                const token = jwt.sign(
                {
                    email: user.email,
                    id: user.id     
                }, 
                process.env.JWT_SECRET, 
                {expiresIn: '2h'},
                {algorithm: "RS256"}
                );

                return res.status(200).json({response: "You have logged in successfully", jwt: token});
            } else {
                return res.status(401).json({response: "Bad data"});
            }
        });

        }  catch (err) {
        res.status(500).json({ response: "Error, please try later"});
    }
};