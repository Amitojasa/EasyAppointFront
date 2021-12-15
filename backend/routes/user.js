const express = require("express");
var router = express.Router();
const {
    getUserById,
    getUser,
    updateUser,

    changePassword,
    createUser,
    getDoctors,
    getManagers,
    getUsers,
    getAdminById,
    updateFormUser
} = require("../controllers/user");
const {
    addPatient
} = require("../controllers/patient");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { check } = require("express-validator");

router.param("userId", getUserById);
router.param("adminId", getAdminById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/user/:userId/:adminId", isAdmin, getUser);
router.get("/users/doctors", getDoctors);
router.get("/users/managers", getManagers);
router.get("/users/:userId", isSignedIn, isAuthenticated, getUsers);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put("/user/:userId/:adminId", isAdmin, updateFormUser);
router.post("/changepassword/:userId", [

    check("newPassword", "password should be at least 3 chars").isLength({
        min: 3
    })
], isSignedIn, isAuthenticated, changePassword);



router.post("/user/create/:adminId", isAdmin, createUser);



router.post("/addpatient/:userId", [
], isSignedIn, isAuthenticated, addPatient);



module.exports = router;
