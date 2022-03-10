var express = require('express')
var router = express.Router()

const { getAllAppointments, getAppointmentsByPatientId, addAppointment, approveAppointment } = require('../controllers/appointment')
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { addTest, getTestById, updateTest, deleteTest, getAllTests, getTest } = require('../controllers/test');
const { getAdminById } = require('../controllers/user');

router.param("adminId", getAdminById);
router.param("testId", getTestById);

router.get('/appointments/:patient_id', isSignedIn, getAppointmentsByPatientId)
router.post('/appointments/:patient_id/create', isSignedIn, addAppointment)
router.get('/appointments', getAllAppointments)
router.put('/appointment/admin/approve', isSignedIn, isAdmin, approveAppointment)


router.get('/test/getall', getAllTests)
router.get('/test/get/:testId', getTest)
router.post('/test/create/:adminId', isAdmin, addTest)
router.put('/test/update/:testId/:adminId', isAdmin, updateTest)
router.delete('/test/delete/:testId/:adminId', isAdmin, deleteTest)


module.exports = router
