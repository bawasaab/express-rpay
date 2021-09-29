var express = require('express');
var router = express.Router();

const RazorPayController = require('../controllers').RazorPayController;
const RazorPayControllerObj = new RazorPayController();

/* GET users listing. */
router.get('/', RazorPayControllerObj.init);
router.post('/order', RazorPayControllerObj.order);
router.post('/callbackUrl', RazorPayControllerObj.callbackUrl);
router.post('/is-payment-successfull', RazorPayControllerObj.paymentSuccessfull);

module.exports = router;
