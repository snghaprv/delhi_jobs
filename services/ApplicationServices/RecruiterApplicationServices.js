const {
  sequelize,
  Job_Application_Status,
  Job_Application,
  Sequelize,
} = require("../../database/models");
const {Op} = Sequelize;

const JS_LAST_ACTION = {
  JS_CALLED: "JS_CALLED",
  JS_WHATSAPP: "JS_WHATSAPP",
  JS_APPLIED: "JS_APPLIED"
};
const R_LAST_ACTION = {
  R_CALLED: "R_CALLED",
  R_REJECTED: "R_REJECTED",
};

const getApplicationCountForJobs = async function (job_ids) {
  const query = `SELECT
                     j.id AS job_id,
                    count(jas.js_id) AS application_count
                   FROM Jobs j
                   LEFT JOIN Job_Application_Status jas
                    ON j.id = jas.job_id AND jas.js_last_action IN ('${JS_LAST_ACTION.JS_WHATSAPP}', '${JS_LAST_ACTION.JS_CALLED}','${JS_LAST_ACTION.JS_APPLIED}')
                    AND ((jas.r_last_action IS NULL) OR (jas.r_last_action IN ('${R_LAST_ACTION.R_CALLED}')) )
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
  if(![R_LAST_ACTION.R_CALLED,R_LAST_ACTION.R_REJECTED].includes(status)){
    return;
  }
  const row = { js_id, job_id, status };
  const application = await Job_Application.findOrCreate({
    where: row,
    defaults: row,
  });
  const updates = {r_last_action:status, updatedAt: new Date() };
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
      js_last_action: {
        [Op.in]: [JS_LAST_ACTION.JS_CALLED, JS_LAST_ACTION.JS_WHATSAPP,JS_LAST_ACTION.JS_APPLIED],
      },
      r_last_action: {
        [Op.or] : [{[Op.in]: [R_LAST_ACTION.R_CALLED]}, {[Op.is]: null}],
      },
    },
    order: [["updatedAt", "DESC"]],
    attributes: ["js_id"],
  });
  applicants = applicants.map(({ js_id }) => js_id);
  return applicants;
};
module.exports = {
  JS_LAST_ACTION,
  R_LAST_ACTION,
  getApplicationCountForJobs,
  changeApplicationStatus,
  getApplicationsForAJob,
};
