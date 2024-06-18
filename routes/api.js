var express = require('express');
var router = express.Router();

var productRouter = require('./product');
router.use('/product', productRouter);

var usersRouter = require('./users');
var authRouter = require('./auth');
router.use('/users', usersRouter);
router.use('/auth', authRouter);



module.exports = router;