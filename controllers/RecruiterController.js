const { JobServices,RecruiterServices,ApplicationServices } = require("../services");
const {RecruiterApplicationServices} =ApplicationServices
const createJob = async function (req, res) {
  try {
      const job_data = req.body;
      const recruiter_id = req.token.id;
      const job_id = await JobServices.createJob(job_data,recruiter_id);
        return res.sendSuccessResponse({job:{job_id}});
  } catch (error) {
      console.error(error)
    return res.sendErrorResponse();
  }
};

const editJob = async function (req, res) {
  try {
    const job_data = req.body;
    const {id:job_id} = job_data;
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

module.exports = {
  createJob,
  editJob,
  editProfile,
  getProfile,
  getAllPostedJobs
};
