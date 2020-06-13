const { JWTUtils } = require("../utils");
const { OTPServices } = require("../services");
const { sendMessage } = OTPServices;
const { JobSeeker } = require("../database/models");

const {
  GENERIC_ERROR,
  PHONE_NOT_AVAILABLE,
  INCORRECT_OTP,
} = require("../constants/messages");

const JOBSEEKER_JWT_TOKEN_EXPIRY_TIME = 365*24*60*60;
const RECRUITER_JWT_TOKEN_EXPIRY_TIME = 365*24*60*60

const sendOTPToJobSeeker = async function (req, res) {
  try {
    const { phone } = req.body;
    const regex = /^[789]\d{9}$/;
    if (!phone || !regex.test(phone)) {
      return res.sendErrorResponse(PHONE_NOT_AVAILABLE);
    }
    const content = `Your OTP is 1123`;
    // await sendMessage(content,phone,'TRANSACTIONAL');
    return res.sendSuccessResponse()
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse(GENERIC_ERROR);
  }
};

const verifyOTPForJobSeeker = async function (req, res) {
try {
    const { phone, otp } = req.body;
    //Logic for getting OTP from Redis.
  
    const [jobseeker, created] = await JobSeeker.findOrCreate({
      where: {
        phone: phone,
      },
      defaults: {
        phone: phone,
      },
    });
    const {id:jobseeker_id} = jobseeker;
    user_token = {jobseeker_id};
    const token =JWTUtils.issue(user_token, JOBSEEKER_JWT_TOKEN_EXPIRY_TIME,JWTUtils.TYPE.LOGIN);
  
    return res.sendSuccessResponse({token});
}catch(error){
    console.error(error);
    return res.sendErrorResponse(GENERIC_ERROR);
}
};

const sendOTPToRecruiter = async function (req, res) {};

const verifyOTPForRecruiter = async function (req, res) {};

module.exports = {
  sendOTPToJobSeeker,
  verifyOTPForJobSeeker,
  sendOTPToRecruiter,
  verifyOTPForRecruiter,
};
