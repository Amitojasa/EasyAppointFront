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
        status: {
            type: String,
            enum: ['pending', 'declined', 'approved', 'in-progress', 'completed'],
            default: 'pending'
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("PcrTest", pcrTestSchema)