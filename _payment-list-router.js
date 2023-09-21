const express = require("express")
const { paymentLIst } = require("./_payment-list")
const router = express.Router()

router.route('/payment-class').get(paymentLIst)