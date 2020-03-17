const express = require('express')
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const router = express.Router();

router.use(
    helmet(),
    logger('dev'),
    cors(),
    express.json()
)

module.exports = router;