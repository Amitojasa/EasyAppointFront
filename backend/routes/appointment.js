var express = require('express')
var router = express.Router()

const { getAllAppointments, getAppointmentsByPatientId, addAppointment, approveAppointment } = require('../controllers/appointment')
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");


router.get('/appointments/:patient_id', isSignedIn, getAppointmentsByPatientId)
router.post('/appointments/:patient_id/create', isSignedIn, addAppointment)
router.get('/appointments', getAllAppointments)
router.put('/appointment/admin/approve', isSignedIn, isAdmin, approveAppointment)

module.exports = router
