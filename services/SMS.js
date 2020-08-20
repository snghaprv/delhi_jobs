const axios = require("axios");
const https = require("https");

const sendSMSOnProduction = async function (content, phone) {
  let {
    GOVT_SMS_USERNAME: username,
    GOVT_SMS_PIN: pin,
    GOVT_SMS_SIGNATURE: signature,
  } = process.env;
  let url = `https://smsgw.sms.gov.in/failsafe/HttpLink?username=${username}&pin=${pin}&message=${content}&mnumber=${phone}&signature=${signature}`;
  const axios_instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  let response = await axios_instance.get(url);
  if (response.status != 200) {
    console.error(response.data);
    throw "OTP_SENDING_FAILURE";
  }

  return response;
};

const sendSMSOnTesting = async function (content, phone, message_type) {
  const KALEYRA_KEYS = {
    TRANSACTIONAL: process.env.KALEYRA_TRANSACTIONAL_API_KEY,
    PROMOTIONAL: process.env.KALEYRA_PROMOTIONAL_API_KEY,
  };
  let url = `https://api-global.kaleyra.com/v4/?method=sms&api_key=${KALEYRA_KEYS[message_type]}&to=91${phone}&message=${content}&format=1122334455667788991010___XXXXXXXXXX&sender=${process.env.KALEYRA_SENDER_ID}`;

  let response = await axios.get(url);
  if (response.data.status != "OK") {
    console.error(response.data);
    throw "OTP_SENDING_FAILURE";
  }
  return response;
};

const sendMessage = async function (content, phone, message_type) {
  let response =
    process.env.NODE_ENV == "production"
      ? await sendSMSOnProduction(content, phone, message_type)
      : await sendSMSOnTesting(content, phone, message_type);
  return response;
};

module.exports = { sendMessage };