var express = require('express');
var router = express.Router();

const razorPayRouter = require('./razorpayRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/razorpay', razorPayRouter);
module.exports = router;
