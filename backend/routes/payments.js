const express = require('express')
const { getUserById, getUser, updateUser, notify } = require("../controllers/user")
const { isAuthenticated, isSignedIn, isSuperAdmin } = require("../controllers/auth")
const { getPaymentHashId, processPayment, stripePayment, payStripeLast, paymentSuccessAction } = require('../controllers/payment')
var router = express.Router()

router.param('userId', getUserById);

router.post("/payment/:userId", isSignedIn, isAuthenticated, getPaymentHashId, processPayment);

router.post('/payment/fail', (req, res) => {

    res.send(req.body);
})
router.post('/payment/success', (req, res) => {

    res.send(req.body);
})


module.exports = router;