const Appointment = require('../models/appointment')
const formidable = require('formidable')

exports.getAllAppointments = (req, res) => {

    let status = req.params.status
    Appointment.find({ status: req.params.status }).populate({
        path: 'patientId',
        populate: {
            path: 'addedByRefId'
        }
    }).populate('doctorId').exec((err, apts) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        console.log(apts)
        res.json(apts);

    })

}

exports.addAppointment = (req, res) => {
    let patientId = req.body.patientId
    let doctorId = req.body.doctorId
    let appointmentTime = req.body.bookingtime
    if (!patientId || !doctorId || !appointmentTime)
        return res.status(400).json()
    let appointment = new Appointment({
        doctorId,
        patientId,
        appointmentTime
    })
    appointment.save((err, appt) => {
        if (err) {
            return res.status(400).json({ error: "Unable to create your appointment", debug: err })
        }
        return res.json({ message: "Appointment Created Successfully, We'll update you once it is confirmed" })
    })


}

exports.updateAppointmentStatus = (req, res) => {

    Appointment.updateOne({ _id: req.params.appointment_id }, { $set: { status: req.params.status } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't update appointment"
            });
        }
    })

    return res.json({ message: "Will approve the appointment" })
}

exports.updateAppointmentFeeStatus = (req, res) => {

    Appointment.updateOne({ _id: req.params.appointment_id }, { $set: { hasPaid: req.params.status } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't update appointment"
            });
        }
    })

    return res.json({ message: "Fee status updated" })
}

exports.getAppointmentsByPatientId = (req, res) => {
    console.log(req)
    Appointment.find({ patientId: req.params.patientId }).populate({
        path: 'patientId',
        populate: {
            path: 'addedByRefId'
        }
    }).populate('doctorId').exec((err, apts) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(apts);

    })


}

exports.getAppointmentsByDoctorId = (req, res) => {
    console.log(req)
    Appointment.find({ doctorId: req.params.doctorId }).populate({
        path: 'patientId',
        populate: {
            path: 'addedByRefId'
        }
    }).populate('doctorId').sort({ appointmentTime: 'desc' }).exec((err, apts) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(apts);

    })
}