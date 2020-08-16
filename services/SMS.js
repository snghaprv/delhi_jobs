const axios = require("axios");
const https = require("https");
const request =require("request");
const doRequest=(url)=> {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
}

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
  // let response=  await doRequest(url);

  if (response.status != 200) {
    console.error(response);
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
  // let response= await doRequest(url);
  console.log(response);
  if (response.status != "OK") {
    console.error(response);
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
