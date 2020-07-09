require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken); 
 
// client.messages 
    //   .create({ 
    //      body: 'Your appointment is coming up on July 21 at 3PM', 
    //      from: 'whatsapp:+14155238886',       
    //      to: 'whatsapp:+918017118008' 
    //    }) 
    //   .then(message => console.log(message.sid)) 
    //   .done();

// module.exports = client;

exports.twilioWriter = async(data_as_string) => {
    client.messages
        .create({ 
            body: data_as_string, 
            from: 'whatsapp:' + process.env.TWILIO_CONTACT_NO,       
            to: 'whatsapp:' + process.env.MY_CONTACT_NO 
        }) 
        .then(message => console.log(message.sid))
        .catch( err => console.log(err))
        .done();
}