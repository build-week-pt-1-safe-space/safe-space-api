const moment = require('moment');
const send_sms = require('./send_sms');

module.exports = message => {
    if(message.send_time === moment().format('HH:mm')) send_sms(message);
    
    else return;
}