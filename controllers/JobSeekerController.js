const {
  JobSeekerServices,
  JobServices,
  RecommendationServices,
  ApplicationServices,
} = require("../services");
const { profile } = JobSeekerServices;
const { BaseRecommender,baseFilters } = RecommendationServices;
const { JobSeekerApplicationServices } = ApplicationServices;

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
    const { body: edit_fields } = req;
    const jobseeker_id = req.token.id;
    await profile.editProfile(jobseeker_id, edit_fields);
    const jobseeker = await profile.getProfile(jobseeker_id);
    return res.sendSuccessResponse(jobseeker);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getAllJobs = async function (req, res) {
  try {
    const jobseeker_id = req.token.id;
    let {filters,page,size} = req.body;
    if(!filters){
      filters = await baseFilters();
    } 
    const recommender =await new BaseRecommender(jobseeker_id,filters);
    
    const {job_ids,job_count} = await recommender.getRecommendedJobs();
  
    const { limit, offset } = getPagination(page, size);
    // console.log(limit,offset);
    // return
    const job_data = await JobServices.getJobsDataForJobSeeker(job_ids,limit, offset);
    return res.sendSuccessResponse({ jobs: job_data,filters,job_count });
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getOneJob = async function (req, res) {
  try {
    const { job_id } = req.params;
    const jobseeker_id = req.token.id;
    const job_data = await JobServices.getOneJobDataForJobSeeker(job_id,jobseeker_id);
    return res.sendSuccessResponse({ job: job_data });
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getAppliedJobs = async function (req, res) {
  const { getAppliedJobs } = JobSeekerApplicationServices;
  try {
    const jobseeker_id = req.token.id;
    let applications = await getAppliedJobs(jobseeker_id);
    const job_ids = applications.map(({ job_id }) => job_id);
    const jobs_data = await JobServices.getJobsDataForJobSeeker(job_ids);
    applications = applications.map((application) => {
      const job_data = jobs_data.find((job) => job.id == application.job_id);
      return { ...application, ...job_data };
    });
    return res.sendSuccessResponse({ applications });
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const applyForAJob = async function (req, res) {
  const {
    changeApplicationStatus,
  } = JobSeekerApplicationServices;
  try {
    const jobseeker_id = req.token.id;
    const { job_id } = req.params;
    const {status} = req.body;
    await changeApplicationStatus(
      jobseeker_id,
      job_id,
      status
    );
    return res.sendSuccessResponse();
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

module.exports = {
  getProfile,
  editProfile,
  getAllJobs,
  getOneJob,
  getAppliedJobs,
  applyForAJob
};
