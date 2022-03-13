var express = require('express')
var router = express.Router()

const { getAllAppointments, getAppointmentsByPatientId, addAppointment, approveAppointment } = require('../controllers/appointment')
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { addTest, getTestById, updateTest, deleteTest, getAllTests, getTest, bookTestAppointment } = require('../controllers/test');
const { getAdminById, getUserById } = require('../controllers/user');

router.param("adminId", getAdminById);
router.param("testId", getTestById);
router.param("userId", getUserById);

router.post('/user/booktest/:userId', isSignedIn, bookTestAppointment)
router.post('/appointments/:patient_id/create', isSignedIn, addAppointment)
// router.get('/appointments', getAllAppointments)
// router.put('/appointment/admin/approve', isSignedIn, isAdmin, approveAppointment)


router.get('/test/getall', getAllTests)
router.get('/test/get/:testId', getTest)
router.post('/test/create/:adminId', isAdmin, addTest)
router.put('/test/update/:testId/:adminId', isAdmin, updateTest)
router.delete('/test/delete/:testId/:adminId', isAdmin, deleteTest)


module.exports = router
