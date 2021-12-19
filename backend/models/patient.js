const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuidv4 = require('uuid');
const { createHmac } = require('crypto');
var patientSchema = new mongoose.Schema(
    {
        patientId: {
            type: String,


        },
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },

        dob: {
            type: String,
            trim: true,
            required: true
        },
        // photo: {
        //     type: String,
        //     trim: true
        // },
        gender: {
            type: String,
            trim: true,
            required: true,
        },
        addedByRefId: {
            // can be normal user or manager
            type: ObjectId,
            required: true,
            trim: true,
            ref: 'User'
        },
        appointmentWithRefId: {
            // will be doctor

            type: ObjectId,

            trim: true,
            ref: 'User'
        },
        prescribtion: {
            type: String,
            maxlength: 1000
        }

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Patient", patientSchema);
