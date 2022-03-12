const Appointment = require('../models/appointment')
const Test = require('../models/test')
const formidable = require('formidable');
const PcrTest = require('../models/pcrtest');


exports.getTestById = (req, res, next, id) => {
    Test.findById(id).exec((err, test) => {
        if (err || !test) {
            return res.status(400).json({
                error: "No test find in DB"
            });
        }

        req.test = test;
        next();
    });
};
exports.getTest = (req, res) => {
    return res.json(req.test);
};


exports.getAllTestAppointments = (req, res) => {

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

exports.addTestAppointment = (req, res) => {
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

// exports.approveAppointment = (req, res) => {
//     return res.json({ message: "Will approve the appointment" })
// }

exports.getTestAppointmentsByPatientId = (req, res) => {
    Appointment.find({ patientId: req.body.patientId }).populate('patientId').populate('doctorId').exec((err, apts) => {
        if (err) {
            return res.status(400).json({
                error: "No User Found"
            });
        }
        res.json(apts);

    })


}

exports.getAllTests = (req, res) => {

    Test.find().exec((err, tests) => {
        if (err) {
            return res.status(400).json({
                error: "NO tests found"
            });
        }
        res.json(tests);
    });

}

exports.addTest = (req, res) => {

    const test = new Test(req.body);
    test.save((err, test) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save test in DB"
            });
        }
        res.json(test);
    });

}

exports.updateTest = (req, res) => {

    Test.findByIdAndUpdate(
        { _id: req.test._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, test) => {
            if (err || !test) {
                return res.status(400).json({
                    error: "Update failed"
                });
            }

            res.json(test);
        }
    );

}

exports.deleteTest = (req, res) => {

    Test.findByIdAndRemove(
        { _id: req.test._id },

        (err, test) => {
            if (err) {
                return res.status(400).json({
                    error: "failed to delete categroy"
                });
            }
            res.json({
                message: `${test.testName} Deleted Successfully`
            })
        });


}


exports.bookTestAppointment = (req, res) => {

    const test = new PcrTest(req.body);
    test.save((err, test) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save apoointment in DB"
            });
        }
        res.json(test);
    });

}