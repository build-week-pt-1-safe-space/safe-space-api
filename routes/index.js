const router = require('express').Router();
const authenticateRequest = require('../middleware/authenticateRequest');

const userRouter = require('./users_route');
const authenticationRouter = require('./authentication_route');
const messageRouter = require('./users_route');

router.use('/users', authenticateRequest, userRouter);
router.use('/messages', authenticateRequest, messageRouter);
router.use('/auth', authenticationRouter);

module.exports = router;