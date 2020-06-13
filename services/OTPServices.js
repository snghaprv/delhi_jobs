
const axios = require('axios');

const sendMessage= async function(content, phone,message_type) {

    const KALEYRA_KEYS = {
        TRANSACTIONAL : process.env.KALEYRA_TRANSACTIONAL_API_KEY,
        PROMOTIONAL : process.env.KALEYRA_PROMOTIONAL_API_KEY
    }
    //let url = `${process.env.SOLUTIONINFINI_BASE_URL}${process.env.SOLUTIONINFINI_API_KEY}&method=sms&message=${content}&to=91${phone}&sender=${process.env.SENDER_ID}`
    let url = `https://api-global.kaleyra.com/v4/?method=sms&api_key=${KALEYRA_KEYS[message_type]}&to=91${phone}&message=${content}&format=1122334455667788991010___XXXXXXXXXX&sender=${process.env.SENDER_ID}`
      let response =await axios.get(url);
      if(response.data.status!='OK'){
        console.error(response.data)
        throw "OTP_SENDING_FAILURE"
      }
      return response;
  }
  

  module.exports = {sendMessage}