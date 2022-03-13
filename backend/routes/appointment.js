var express = require('express')
var router = express.Router()

const { getAllTestAppointments, getTestAppointmentsByPatientId, addTestAppointment } = require('../controllers/test')
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {getAppointmentsByPatientId,updateAppointmentStatus,getAllAppointments}=require('../controllers/appointment')


router.get('/pcrtest/:patient_id', isSignedIn, getTestAppointmentsByPatientId);
router.post('/pcrtest/:patient_id/create', isSignedIn, addTestAppointment);
router.get('/appointments', getAllTestAppointments);
router.get('/appointments/:patientId', isSignedIn,getAppointmentsByPatientId);

router.get('/allappointments/:status', isSignedIn,getAllAppointments);
router.put('/appointment/:appointment_id/:status', isSignedIn,updateAppointmentStatus);

// router.put('/appointment/admin/approve', isSignedIn, isAdmin, approveAppointment)

module.exports = router
