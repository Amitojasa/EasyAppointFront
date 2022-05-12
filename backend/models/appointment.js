const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

var appointmentSchema = new mongoose.Schema(
    {
        doctorId: {
            type: ObjectId,
            ref: 'User',
            required: true,
            trim: true,
        },
        patientId: {
            type: ObjectId,
            ref: 'Patient',
            required: true,
            trim: true
        },
        appointmentTime: {
            type: String,
            required: true,
            trim: false
        },
        isApproved: {
            type: Boolean,
            default: false,
            required: false
        },
        status: {
            type: String,
            enum: ['pending', 'cancelled', 'approved', 'declined'],
            default: 'pending'
        },
        hasPaid: {
            type: String,
            enum: ['unpaid', 'paid', 'cancel', 'request'],
            default: 'unpaid'
        },
        meetingData: {
            type: Object,
            required: false,
            default: {}
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("Appointment", appointmentSchema)