const router = require('express').Router();

const userRouter = require('./users_route');
const messageRouter = require('./users_route');

router.use('/users', userRouter);
router.use('/messages', messageRouter);

module.exports = router;