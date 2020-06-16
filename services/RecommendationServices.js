const { Job } = require("../database/models");
const JobServices = require('./JobServices');

const getJobs = async function (user_id) {
  let jobs = Job.findAll();
  jobs = jobs.map((job) => job.toJSON());
  let job_ids = jobs.map((job) => job.id);
  JobServices.getJobsDataForJobSeeker(job_ids);
};

module.exports = {
    getJobs
}