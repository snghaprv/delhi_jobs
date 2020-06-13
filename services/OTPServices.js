const {generator} =require('../utils')
const SMS = require('./SMS')
const Redis = require("ioredis");
const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})

const MAX_OTP_GENERATE_ATTEMPTS_ALLOWED = 4 ;
const MAX_OTP_ENTERING_ATTEMPTS_ALLOWED = 4;

async function getAndSendOTP(keyObject, phone){
    let {key, ttl, attempts_key, entered_key,user_type} = keyObject; 
    let resend = false;
    let otp = await redis.get(key);
    let attempts_count = await redis.get(attempts_key);
    if(attempts_count>=MAX_OTP_GENERATE_ATTEMPTS_ALLOWED){
        throw('MAX_OTP_ATTEMPTS_EXHAUSTED')
    }
    let otp_entered_count = await redis.get(entered_key);
    if(otp_entered_count>=MAX_OTP_GENERATE_ATTEMPTS_ALLOWED){
        throw('MAX_OTP_ATTEMPTS_EXHAUSTED')
    }
    if(!otp){
        otp = generator.GenerateOTP();
        await redis.set(key, otp, "EX", ttl);
        await redis.set(attempts_key,1,'EX',ttl);
        await redis.set(entered_key, 1,'EX',ttl)
    }else {
        await redis.set(attempts_key,parseInt(attempts_count)+1, 'EX',ttl )
        resend = true;
    }
    let content; 
    if(user_type== 'RECRUITER'){
        content = encodeURIComponent (`<#> ${otp} is your verification code for Delhi Job Board-Recruiter\n \n \n ${process.env.RECRUITER_APP_HASH}`)
    } else if(user_type== 'JOBSEEKER'){
        content = encodeURIComponent (`<#> ${otp} is your verification code for Delhi Job Board-JOBSEEKER.\n \n \n ${process.env.JOB_SEEKER_APP_HASH}`)
    }

    await SMS.sendMessage(content, phone, 'TRANSACTIONAL');
    return {otp,resend};
   // return {delivery_id, otp, resend};
}

async function verifyOTP(keyObject, otp){
    let {key, attempts_key, entered_key, ttl} = keyObject; 
    let sent_otp = await redis.get(key);
    let otp_entered_count = await redis.get(entered_key);
    if(otp_entered_count>= MAX_OTP_ENTERING_ATTEMPTS_ALLOWED){
        throw("MAX_OTP_ENTERING_ATTEMPTS_EXHAUSTED")
    }
    if(isNaN(otp_entered_count)){
        otp_entered_count =0;
    }
    if (Number(sent_otp) != Number(otp)) {
        await redis.set(entered_key,parseInt(otp_entered_count)+1, "EX",ttl  )
        return false 
    }else {
        redis.del(key);
        redis.del(entered_key)
        redis.del(attempts_key)
        return true
    }
}


module.exports = { getAndSendOTP, verifyOTP}