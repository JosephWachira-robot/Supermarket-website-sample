const express = require('express');
const stripeCtrl = require('../controllers/stripe');
const mpesaCtrl = require('../controllers/mpesa');
const router = express.Router();

router.post('/stripe/create-payment-intent', stripeCtrl.createPaymentIntent);
router.post('/stripe/webhook', stripeCtrl.webhookHandler);

router.post('/mpesa/stkpush', mpesaCtrl.stkPush);
router.post('/mpesa/callback', mpesaCtrl.callback);

module.exports = router;
