const Appointment = require('../models/appointment')
const User = require('../models/user')
const formidable = require('formidable')
const meetings = require('./meetings')

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
exports.getAllMyAppointments = (req, res) => {

    let uId = req.profile._id;
    var p = [];
    User.findById(uId).exec((err, usr) => {
        if (!err) {
            console.log(usr.patients);
            p = [...usr.patients];
            Appointment.find({ patientId: { $in: p } }).populate({
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
                // console.log(apts)
                res.json(apts);

            })
        } else {

            return res.status(400).json({
                error: "No User Found"
            });
        }
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

    console.log(req.params.status)

    Appointment.updateOne({ _id: req.params.appointment_id }, { $set: { status: req.params.status } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't update appointment"
            });
        }
        if(req.params.status=='approved'){
            meetings.createMeeting(
                {
                    doctorEmail:'ankitstudy88@gmail.com',
                    patientEmail:'ritiksonu882000@gmail.com',
                    doctorName: 'Ankit Mishra',
                    patientName:'Ritik Prashar',
                    bookingTime: "2022-03-25T07:32:55Z"
                },
                (meeting)=>{
                    let meetingData={
                        meeting_id: meeting.id,
                        start_url: meeting.start_url,
                        join_url: meeting.join_url,
                        additional_data: meeting
                    }
                    console.log("meeting data",meetingData)
                    Appointment.updateOne({ _id: req.params.appointment_id }, { $set: { meetingData} }).exec((err, result)=>{
                        if(err){
                            console.log("Some error occured in updating meeting data")
                            // May be I want to revert the status to pending again 
                            return res.status(400).json({
                                error: "Couldn't update meeting data"
                            });
                        }
                        console.log("Meeting data updated",req.params.appointment_id )
                            
                    })
                    
                },
                (err)=>{
                    console.log("Error in creating meeting link",err)
                    // May be I want to revert the status to pending again
                    return res.status(400).json({
                        error: "Couldn't update meeting data"
                    });
                }
            )
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