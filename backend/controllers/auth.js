const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { check, validationResult } = require("express-validator");

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout"
    });
};

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: "Not able to save user in DB"
                error: err
            });
        }
        res.json({
            //TODO: will change
            name: user.name,
            email: user.email,
            id: user._id,
            role: user.role
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email does not exists"
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "email and password does not match."
            });
        }
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //sendresponse to frontend
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, name, email, role }
        });
    });
};

//protected Routes

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "access denied"
        });
    }
    next();
};

// TODO: More middlewares such as isdoctor , is patient  , and isassistant to come




exports.isAdmin = (req, res, next) => {
    // console.log(req.admin)
    if (req.admin.role !== 3) {
        return res.status(403).json({
            error: "You are not the admin,access Denied"
        });
    }
    next();
};
