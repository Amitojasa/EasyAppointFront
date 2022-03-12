const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

var pcrTestSchema = new mongoose.Schema(
    {

        patientId: {
            type: ObjectId,
            ref: 'Patient',
            required: true,
            trim: true
        },
        testId: {
            type: ObjectId,
            ref: 'Test',
            required: true,
            trim: true
        },
        appointmentTime: {
            type: String,
            required: true,
            trim: false
        },
        result: {
            type: String,

        },
        testDone: {
            type: Boolean,
            default: false,
            required: false
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("PcrTest", pcrTestSchema)