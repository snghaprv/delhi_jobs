const {Job} = require('../database/models')

const formatJobData = function(job_data){
}

const createJob = async function (job_data,recruiter_id){

    const status ='ACTIVE';
    const expiry_date = (new Date()).setDate((new Date()).getDate() + 30)
    job_data = {...job_data,recruiter_id,status,expiry_date}
    let {skills} = job_data;
    if(skills){
        skills = JSON.stringify(skills);
        job_data= {...job_data,skills}
    }

    const job = await Job.create(job_data)
    return job.id;
}

const getJobData = async function(job_id){
    const job = await Job.findOne({id:job_id});
    return job;
}

module.exports = {
    createJob
}