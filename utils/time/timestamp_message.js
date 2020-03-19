const moment = require('moment');

const timestamp_message = message => {

    message.created_at = moment().format('HH:mm');
    message.send_time = moment().add(1, 'minutes').format('HH:mm');

}

module.exports = timestamp_message;