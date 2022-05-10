var express = require('express')
var router = express.Router()

const { getAllTestAppointments, getTestAppointmentsByPatientId, addTestAppointment, updateTestAppointmentStatus } = require('../controllers/test')
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getAppointmentsByPatientId, updateAppointmentFeeStatus, updateAppointmentStatus, getAllAppointments, getAppointmentsByDoctorId, getAllMyAppointments } = require('../controllers/appointment');
const { getUserById } = require('../controllers/user');

router.param("userId", getUserById);


router.get('/pcrtest/:patient_id', isSignedIn, getTestAppointmentsByPatientId);
router.post('/pcrtest/:patient_id/create', isSignedIn, addTestAppointment);
router.get('/alllabappointments/:status', isSignedIn, getAllTestAppointments);

router.get('/appointments/:patientId', isSignedIn, getAppointmentsByPatientId);
router.get('/doctor-appointments/:doctorId', isSignedIn, getAppointmentsByDoctorId);

router.get('/allappointments/:status', isSignedIn, getAllAppointments);
router.get('/allmyappointments/:userId', isSignedIn, isAuthenticated, getAllMyAppointments);
router.put('/appointment/:appointment_id/:status', isSignedIn, updateAppointmentStatus);
router.put('/appointment/fee/:appointment_id/:status', isSignedIn, updateAppointmentFeeStatus);
router.put('/labappointment/:appointment_id/:status', isSignedIn, updateTestAppointmentStatus);

// router.put('/appointment/admin/approve', isSignedIn, isAdmin, approveAppointment)

module.exports = router
