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
    console.log(otp);
    let attempts_count = await redis.get(attempts_key);
    if(attempts_count>=MAX_OTP_GENERATE_ATTEMPTS_ALLOWED){
        throw('MAX_OTP_ATTEMPTS_EXHAUSTED')
    }
    let otp_entered_count = await redis.get(entered_key);
    if(otp_entered_count>=MAX_OTP_GENERATE_ATTEMPTS_ALLOWED){
        throw('MAX_OTP_ATTEMPTS_EXHAUSTED')
    }
    if(!otp){
        otp = 1234;//generator.GenerateOTP();
        console.log(otp);
        await redis.set(key, otp, "EX", ttl);
        await redis.set(attempts_key,1,'EX',ttl);
        await redis.set(entered_key, 1,'EX',ttl)
    }else {
        await redis.set(attempts_key,parseInt(attempts_count)+1, 'EX',ttl )
        resend = true;
    }
    let content; 
    if(user_type== 'RECRUITER'){
        content = encodeURIComponent (`Dear Employer \n\nOTP for registration to RojgarBazaar website is ${otp}`)
    } else if(user_type== 'JOBSEEKER'){
        content = encodeURIComponent (`Dear Job Seeker \n\nOTP for registration to RojgarBazaar website is ${otp}`)
    }
    return {otp,resend};

    await SMS.sendMessage(content, phone, 'TRANSACTIONAL');
    return {otp,resend};
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
