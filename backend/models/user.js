const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuidv4 = require('uuid');
const { createHmac } = require('crypto');
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },

        phone: {
            type: String,
            maxlength: 15,
            trim: true,
        },
        dob: {
            type: String,
            trim: true,
            required: true
        },
        photo: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            trim: true,
            required: true,
        },
        address: {
            type: String,
            maxlength: 200,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        patients: [{ type: ObjectId, ref: "Patient" }],

        // admin=3,doctor=2, manager=1, patient=0 lab=4
        role: {
            type: Number,
            trim: true,
            default: 0
        },

        encrypassword: {
            type: String,
            required: true
        },
        salt: String,

    },
    {
        timestamps: true
    }
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password; //created a private variable using underscore(_)
        this.salt = uuidv4.v4();
        this.encrypassword = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) == this.encrypassword;
    },

    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
