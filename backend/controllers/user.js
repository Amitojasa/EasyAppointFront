const { validationResult } = require("express-validator");
const User = require("../models/user");
const formidable = require("formidable");

const fs = require("fs"); //file system

const path = require("path")
const _ = require("lodash");
const { uploadFileFunc } = require("../utils/fileupload.js");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user find in DB"
            });
        }

        req.profile = user;
        next();
    });
};
exports.getAdminById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user find in DB"
            });
        }

        req.admin = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.encrypassword = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.updateFormUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.status(400).json({
                error: "Some problem whith form"
            });
        }

        //updation
        let user = req.profile;




        user = _.extend(user, fields);



        //handle file here
        if (file.photo) {
            try {
                fs.unlinkSync('uploads/' + user.photo);
            } catch (err) {
                console.log("file not found")
            }



            var fur = uploadFileFunc(file);

            if (fur.error) {
                return res.status(400).json({
                    error: fur.error
                })
            }

            var newPath1 = fur;
            var newPath = 'uploads/' + newPath1


            user.photo = newPath1;

        }

        // //save to db

        user.save((err, user) => {
            if (err) {
                try {
                    fs.unlinkSync(newPath);
                } catch (err) {
                    console.log("file not found")
                }

                res.status(400).json({
                    error: "updating user in DB failed!!"
                });
            }
            res.json({
                message: "user updated successfully",
                user
            })
        });
    });
}


exports.updateUser = (req, res) => {
    console.log(req)
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Update failed"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.encrypassword = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    );
};


exports.changePassword = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const { newPassword, oldPassword } = req.body;

    const id = req.auth._id;
    User.findOne({ _id: id }, (err, user) => {
        if (!user || err) {
            return res.status(400).json({ error: 'User not found.' })
        }

        if (!user.authenticate(oldPassword)) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }
        User.findOneAndUpdate(
            { _id: id },
            { $set: { encrypassword: user.securePassword(newPassword) } },
            (err, user) => {
                // console.log(user);
                if (err) {
                    return res.status(400).json({ error: 'Failed' })
                }
                let { _id, email, name, role } = user;
                return res.status(200).json({
                    user: { _id, email, name, role }
                })
            }
        )
    })
}





//middleware
exports.photo = (req, res, next) => {
    if (req.user.photo) {
        // res.set("Content-Type", req.user.photo.contentType);
        return res.send(req.user.photo);
    }
    next();
};
////////
exports.createUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }

        //destructuring the fields

        const {
            name,
            email,
            password,
            dob,
            gender,
            phone,

            role,
            address
        } = fields;
        if (!name || !email || !password || !dob || !gender || !phone || !role || !address) {
            return res.status(400).json({
                error: "Please include all the fields"
            });
        }
        let user = new User(fields);

        /////// handle file here
        if (file.photo) {




            ///TODO: check file type


            var fur = uploadFileFunc(file);

            if (fur.error) {
                return res.status(400).json({
                    error: fur.error
                })
            }

            var newPath1 = fur;
            // var newPath = 'uploads/' + newPath1


        }
        user.photo = newPath1;

        //save to db

        user.save((err, usr) => {
            if (err) {
                res.status(400).json({
                    error: "saving user in DB failed!!"
                });
            }
            res.json(usr);
        });
    });
};


exports.getDoctors = (req, res) => {
    // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    User.find({ role: 2 }).exec((err, events) => {
        if (err) {
            return res.status(400).json({
                error: "No Doctor Found"
            });
        }
        res.json(events);
    });
}
exports.getManagers = (req, res) => {
    // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    User.find({ role: 1 }).exec((err, events) => {
        if (err) {
            return res.status(400).json({
                error: "No Manager Found"
            });
        }
        res.json(events);
    });
}
exports.getLabattendants = (req, res) => {
    // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    User.find({ role: 4 }).exec((err, events) => {
        if (err) {
            return res.status(400).json({
                error: "No Lab Attendant found Found"
            });
        }
        res.json(events);
    });
}

exports.getUsers = (req, res) => {
    // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    User.find().exec((err, events) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(events);
    });
}