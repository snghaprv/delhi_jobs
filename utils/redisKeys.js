const get_OTP_TTL = function(){
    return process.env.NODE_ENV == 'production' ? 1800 : 60
}


const getJobSeekerKeys = function(js_id){
    const getLoginOTPKeys= function (phone) {
        return {
            key: `JOB_SEEKER__LOGIN__OTP__${phone}`,
            attempts_key : `JOB_SEEKER__LOGIN__ATTEMPTS__${phone}`,
            entered_key : `JOB_SEEKER__LOGIN__ENTERED__${phone}`,
            ttl: get_OTP_TTL(),
            app : 'JOB_SEEKER'
        }
    }
    return {getLoginOTPKeys}
}