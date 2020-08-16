const { JobServices,RecruiterServices,ApplicationServices,JobSeekerServices } = require("../services");
const {RecruiterApplicationServices} =ApplicationServices;
const {profile} =JobSeekerServices;
const {getApplicantsProfile} = profile;
const createJob = async function (req, res) {
  try {
      const job_data = req.body;
      const recruiter_id = req.token.id;
      const {id,is_company_verified} = await JobServices.createJob(job_data,recruiter_id);
     console.log("++++++++++++++++++++++++++++++",id,is_company_verified);
        return res.sendSuccessResponse({job:{id,is_company_verified:is_company_verified}});
  } catch (error) {
      console.error(error)
    return res.sendErrorResponse();
  }
};

const editJob = async function (req, res) {
  try {
    const job_data = req.body;
    const {job_id} = req.params;
    await JobServices.editJob(job_data,job_id)
    return res.sendSuccessResponse();
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const editProfile = async function(req,res){
  try{
    const recruiter_id = req.token.id;
    const fields = req.body;
    await RecruiterServices.editProfile(recruiter_id,fields);
    const recruiter = await RecruiterServices.getProfile(recruiter_id);
    return res.sendSuccessResponse(recruiter);
  } catch(error){
    console.error(error);
    return res.sendErrorResponse();
  }
}
const getProfile = async function(req,res){
  try{
    const recruiter_id = req.token.id;
    const recruiter = await RecruiterServices.getProfile(recruiter_id);
    return res.sendSuccessResponse(recruiter);
  } catch(error){
    console.error(error);
    return res.sendErrorResponse();
  }

}

const getAllPostedJobs = async function(req,res){
  try {
  const recruiter_id = req.token.id;
  const {active_jobs, inactive_jobs} = await JobServices.getJobsPostedByRecruiter(recruiter_id);
  return res.sendSuccessResponse({active_jobs,inactive_jobs});
  } catch(error){
    console.error(error);
    return res.sendErrorResponse();
  }

}

const changeApplicationStatus = async function(req,res){
  const {
    changeApplicationStatus
  } = RecruiterApplicationServices;
  try {
    const {applicant_id,job_id} = req.params;
    const {status} = req.body;
    await changeApplicationStatus(
      applicant_id,
      job_id,
      status
    );
    return res.sendSuccessResponse();
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
}

const getApplicationsForAJob = async function(req,res){
try{
  const {job_id} = req.params;
  const job = await JobServices.getJobPostedByRecruiter(job_id); 
  const {title} =job;
  const applicant_ids = await RecruiterApplicationServices.getApplicationsForAJob(job_id);
  const applicants = await getApplicantsProfile(applicant_ids)
  return res.sendSuccessResponse({applicants,title});
 }catch(error){
  console.error(error);
  return res.sendErrorResponse();
 }
}
const getOneJob = async function(req,res){
 try{
  const {job_id} = req.params;
  const job = await JobServices.getJobPostedByRecruiter(job_id); 
  return res.sendSuccessResponse({job});
 }catch(error){
  console.error(error);
  return res.sendErrorResponse();
 }
}
module.exports = {
  createJob,
  editJob,
  editProfile,
  getProfile,
  getAllPostedJobs,
  getOneJob,
  changeApplicationStatus,
  getApplicationsForAJob
};
