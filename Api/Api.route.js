const express = require('express')
const { InitializePayment, verifyPayment } = require('./Api')
const router = express.Router()

router.route('/paystack/innitialize-payment').post(InitializePayment)
router.route('/paystack/verify-payment/:reference').get(verifyPayment)

module.exports = router;