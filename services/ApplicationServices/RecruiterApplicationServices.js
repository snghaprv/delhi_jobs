const {
    sequelize,
    Job_Application_Status,
    Job_Application
  } = require("../../database/models");

const APPLICATION_STATUS = {
    R_CALLED: "R_CALLED",
    R_REJECTED: "R_REJECTED",
};


const getApplicationCountForJobs = async function (job_ids) {
  const query = `SELECT
                     j.id AS job_id,
                    count(jas.js_id) AS application_count
                   FROM Jobs j
                   LEFT JOIN Job_Application_Status jas
                    ON j.id = jas.job_id AND jas.status IN ('JS_CALLED')
                   WHERE j.id IN (:job_ids) 
                   GROUP BY j.id`;
  const [result] = await sequelize.query(query, {
    replacements: {
      job_ids,
    },
  });
  return result;
};

const changeApplicationStatus = async function (js_id, job_id, status) {
  const row = { js_id, job_id, status };
  const application = await Job_Application.findOrCreate({
    where: row,
    defaults: row,
  });
  const application_status = [{ ...row, updatedAt: new Date() }];
  await Job_Application_Status.bulkCreate(application_status, {
    updateOnDuplicate: ["status", "updatedAt"],
  });
  return application;
};

module.exports = {
    APPLICATION_STATUS,
    getApplicationCountForJobs,
    changeApplicationStatus
};
