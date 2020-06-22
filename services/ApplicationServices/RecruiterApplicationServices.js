const {
  sequelize,
  Job_Application_Status,
  Job_Application,
  Sequelize,
} = require("../../database/models");
const Op = Sequelize.Op;

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
  if(![APPLICATION_STATUS.R_CALLED,APPLICATION_STATUS.R_REJECTED].includes(status)){
    return;
  }
  const row = { js_id, job_id, status };
  const application = await Job_Application.findOrCreate({
    where: row,
    defaults: row,
  });
  const updates = { status, updatedAt: new Date() };
  await Job_Application_Status.update(
    updates,
    {
      where: {
        js_id,
        job_id
      },
    }
  );
  return application;
};

const getApplicationsForAJob = async function (job_id) {
  
  let applicants = Job_Application_Status.findAll({
    where: {
      job_id,
      status: {
        [Op.in]: ["JS_CALLED", "R_CALLED"],
      },
    },
    order: [["updatedAt", "DESC"]],
    attributes: ["js_id"],
  });
  applicants = applicants.map(({ js_id }) => js_id);
  return applicants;
};
module.exports = {
  APPLICATION_STATUS,
  getApplicationCountForJobs,
  changeApplicationStatus,
  getApplicationsForAJob,
};
