const User = require("../models/user");
const Patient = require("../models/patient");
const { customAlphabet } = require('nanoid')

const { check, validationResult } = require("express-validator");

const formidable = require("formidable");

const fs = require("fs"); //file system

const path = require("path")
const _ = require("lodash");
const { uploadFileFunc } = require("../utils/fileupload.js");

const nanoid = customAlphabet('1234567890abcdef', 5)


exports.getPatientById = (req, res, next, id) => {
    Patient.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No patient find in DB"
            });
        }

        req.patient = user;
        next();
    });
};

exports.getPatient = (req, res) => {

    req.patient.createdAt = undefined;
    req.patient.updatedAt = undefined;
    return res.json(req.patient);
};

exports.updatePatient = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.status(400).json({
                error: "Some problem whith form"
            });
        }

        //updation
        let patient = req.patient;




        patient = _.extend(patient, fields);



        //handle file here
        if (file.photo) {
            try {
                fs.unlinkSync('uploads/' + patient.photo);
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


            patient.photo = newPath1;

        }

        // //save to db

        patient.save((err, patient) => {
            if (err) {
                // try {
                //     fs.unlinkSync(newPath);
                // } catch (err) {
                //     console.log("file not found")
                // }

                res.status(400).json({
                    error: "updating user in DB failed!!"
                });
            }
            res.json({
                message: "user updated successfully",
                patient
            })
        });
    });
};


exports.updatePatientPrescribtion = (req, res) => {
    const { prescribtion } = req.body;
    console.log(req.body);
    const id = req.patient._id;


    Patient.findOneAndUpdate(
        { _id: id },
        { $set: { prescribtion: prescribtion } },
        (err, ptnt) => {

            if (err) {
                return res.status(400).json({ error: 'Failed' })
            }

            return res.status(200).json({
                patient: ptnt
            })
        }
    )

};

exports.addPatient = (req, res) => {
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
            dob,
            gender,

        } = fields;
        if (!name || !dob || !gender) {
            return res.status(400).json({
                error: "Please include all the fields"
            });
        }
        let patient = new Patient(fields);
        patient.addedByRefId = req.profile._id;
        patient.patientId = nanoid();
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

            patient.photo = newPath1;
        }


        //get all patients from db

        var patientList = [];


        patient.save((err, ptnt) => {
            if (err) {
                res.status(400).json({
                    error: "saving ptnt in DB failed!!"
                });
            }

            patientList.push(ptnt._id)
            User.findOneAndUpdate(
                { _id: req.profile._id },
                { $push: { patients: patientList } },
                { $new: true },
                (err, patients) => {
                    if (err || !patients) {
                        return res.status(400).json({
                            error: "Unable to save patients"
                        });
                    }

                }
            );
            res.json(ptnt)
        });
    });
};



exports.getPatients = (req, res) => {

    User.findById(req.profile._id).populate('patients').exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(user.patients);
    });
}
exports.getAllPatients = (req, res) => {

    Patient.find().exec((err, ptnts) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(ptnts);
    });
}