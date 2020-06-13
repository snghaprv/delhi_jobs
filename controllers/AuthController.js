const { JWTUtils } = require("../utils");
const { OTPServices,JobSeekerServices } = require("../services");
const {profile} = JobSeekerServices;
const { getAndSendOTP,verifyOTP } = OTPServices;
const { JobSeeker } = require("../database/models");
const redisKeys = require('../utils/redisKeys')
const {getJobSeekerKeys} =redisKeys;
const {
  GENERIC_ERROR,
  PHONE_NOT_AVAILABLE,
  INCORRECT_OTP,
  OTP_MAX_ATTEMPT_ERROR,
  OTP_MAX_VERIFY_ERROR,
  OTP_SENT_SUCCESSFUL
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
    const keyObject =getJobSeekerKeys(null).getLoginKeys(phone);
    await getAndSendOTP(keyObject, phone);
    return res.sendSuccessResponse({message:OTP_SENT_SUCCESSFUL })
  } catch (error) {
    console.error(error);
    if(error=='MAX_OTP_ATTEMPTS_EXHAUSTED'){
      return  res.sendErrorResponse(OTP_MAX_ATTEMPT_ERROR);
    }
    return res.sendErrorResponse(GENERIC_ERROR);
  }
};

const verifyOTPForJobSeeker = async function (req, res) {
try {
    const { phone, otp } = req.body;
    //Logic for getting OTP from Redis.
    let keyObject = getJobSeekerKeys(null).getLoginKeys(phone);
    let is_correct = await verifyOTP(keyObject, otp);
    if (!is_correct) {
      return res.sendErrorResponse(INCORRECT_OTP);
  }
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
    const jobseeker_profile = await profile.getProfile(jobseeker_id);
    const {Categories} = jobseeker_profile;
    const langing_page =  Categories.length>0 ? 'JOB_LISTING':'REGISTRATION';
    return res.sendSuccessResponse({token,langing_page});
}catch(error){
    console.error(error);
    if(error=='MAX_OTP_ENTERING_ATTEMPTS_EXHAUSTED'){
      return  res.sendErrorResponse(OTP_MAX_VERIFY_ERROR);
    }

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
