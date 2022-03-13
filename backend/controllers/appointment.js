const Appointment = require('../models/appointment')
const formidable = require('formidable')

exports.getAllAppointments = (req, res) => {

    Appointment.find().populate('patientId').populate('doctorId').exec((err, apts) => {
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

exports.approveAppointment = (req, res) => {
    return res.json({ message: "Will approve the appointment" })
}

exports.getAppointmentsByPatientId = (req, res) => {
    console.log(req)
    Appointment.find({ patientId: req.params.patientId }).populate('patientId').populate('doctorId').exec((err, apts) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(apts);

    })


}