const { JobServices } = require("../services");

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

module.exports = {
  createJob,
  editJob
};
