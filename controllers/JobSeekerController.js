const {JobSeekerServices,JobServices} = require('../services');
const {profile} = JobSeekerServices;
//getJobData

const getProfile = async function (req, res) {
  try {
    const jobseeker_id = req.token.id;
    const jobseeker = await profile.getProfile(jobseeker_id);
    return res.sendSuccessResponse(jobseeker);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const editProfile = async function (req, res) {
  
  try {
    const {body:edit_fields} = req;
    const jobseeker_id = req.token.id;
    await profile.editProfile(jobseeker_id,edit_fields);
    const jobseeker = await profile.getProfile(jobseeker_id);
    return res.sendSuccessResponse(jobseeker);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const deleteProfile = async function(req,res){
 try{
  const jobseeker_id = req.token.id;
  await profile.deleteProfile(jobseeker_id)
  return res.sendSuccessResponse();
 } catch(error){
  console.error(error);
  return res.sendErrorResponse();
 }
}
const getAllJobs = async function (req,res){
  try {
    const job_data = await JobServices.getOneJobDataForJobSeeker(job_id);
    return res.sendSuccessResponse({job:job_data});
  } catch(error){
    console.error(error);
    return res.sendErrorResponse();
  }
}
const getOneJob = async function (req,res){
  try {
    const {job_id} = req.params;
    const job_data = await JobServices.getOneJobDataForJobSeeker(job_id);
    return res.sendSuccessResponse({job:job_data});
  } catch(error){
    console.error(error);
    return res.sendErrorResponse();
  }

}

module.exports = {
  getProfile,
  editProfile,
  deleteProfile,
  getAllJobs,
  getOneJob
};
