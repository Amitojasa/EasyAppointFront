const mongoose = require("mongoose");

var testSchema = new mongoose.Schema(
    {

        testName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        description: {
            type: String,
            maxlength: 500,
        },

        cost: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        }


    }
);


module.exports = mongoose.model("Test", testSchema);
