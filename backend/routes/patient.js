const express = require("express");
var router = express.Router();
const {
    getUserById,
    getUser,
    getAdminById,

} = require("../controllers/user");
const {
    addPatient,
    getPatients,
    getPatientById,
    getPatient,
    getAllPatients,
    updatePatient
} = require("../controllers/patient");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");


router.param("userId", getUserById);
// router.param("adminId", getAdminById);
router.param("patientId", getPatientById);


router.get("/patients/:userId", isSignedIn, isAuthenticated, getPatients);
router.get("/allpatients/:userId", isSignedIn, isAuthenticated, getAllPatients);

router.post("/patient/create/:userId", [
], isSignedIn, isAuthenticated, addPatient);

router.get("/patient/:patientId/:userId", isSignedIn, isAuthenticated, getPatient);
router.put("/patient/:patientId/:userId", isSignedIn, isAuthenticated, updatePatient);

module.exports = router;
