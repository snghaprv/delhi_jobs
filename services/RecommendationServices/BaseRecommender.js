const { Job } = require("../../database/models");

class BaseRecomemnder {
  constructor(jobseeker_id) {
    this.jobseeker_id = jobseeker_id;
  }

  async getRecommendedJobs() {
      let jobs = await Job.findAll({
          attributes: ["id"]
      })
       jobs = jobs.map(job =>job.toJSON())
       jobs = jobs.map(({id})=>id);
      return jobs;
  }
}

module.exports = BaseRecomemnder;