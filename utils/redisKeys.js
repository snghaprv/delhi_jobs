const get_OTP_TTL = function(){
    return process.env.NODE_ENV == 'production' ? 1800 : 60
}


const getJobSeekerKeys = function(js_id){
    const getLoginKeys= function (phone) {
        return {
            key: `JOBSEEKER__LOGIN__OTP__${phone}`,
            attempts_key : `JOBSEEKER__LOGIN__ATTEMPTS__${phone}`,
            entered_key : `JOBSEEKER__LOGIN__ENTERED__${phone}`,
            ttl: get_OTP_TTL(),
            user_type: 'JOBSEEKER'
        }
    }
    return {getLoginKeys}
}

module.exports ={
    getJobSeekerKeys
}