const Users = require('../../models/users_model');

const SID = process.env.SID;
const auth_token = process.env.AUTH_TOKEN;
const twilio_number = process.env.NUMBER;
const test_receiver = process.env.TEST_NUMBER;

const client = require('twilio')(SID, auth_token);

const send_sms = text => {
    const id = text.user_id;
    
    Users.getBy({ id })
      .then(res => {
        let phone = res.phone;

        if(phone[0] !== '+' || phone[1] !== '1') {
            phone[0] === 1 ? phone = `+${phone}`
                           : phone = `+1${phone}`
        }
          
        client.messages
                .create({
                    body: text.body,
                    to: test_receiver,
                    from: twilio_number
                })
                .then(message => console.log('Message Sent'))
                .catch(err => console.log(err));
      })
}

module.exports = send_sms;