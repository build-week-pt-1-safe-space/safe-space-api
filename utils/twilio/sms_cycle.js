const Messages = require('../../models/messages_model');
const time_check = require('./time_check');

const run_sms_cycle = () => {
    console.log('SMS Cycle Running...')
    intervalID = setInterval(() => {

        Messages.get()
            .then(messages => messages.map( message => time_check(message)))
            .catch(err => console.log(err));

    }, 50000);
}

module.exports = run_sms_cycle;
