const { Job_Application,sequelize } = require("../../database/models");
const APPLICATION_STATUS = {
  JS_VIEWED: "JS_VIEWED",
  JS_CALLED: "JS_CALLED",
};
const getAppliedJobs = async function (jobseeker_id) {
  const query = `SELECT 
                    applications.job_id,
                    IF(actions.job_id IS NULL,
                        'JS_CALLED',
                        'R_CALLED') status,
                    IF(actions.createdAt IS NULL,applications.createdAt,actions.createdAt) as last_tstamp    
                    FROM
                    (SELECT 
                        *
                    FROM
                        Job_Applications
                    WHERE
                        js_id = 1 AND status IN ('JS_CALLED')) applications
                        LEFT JOIN
                    (SELECT 
                        *
                    FROM
                        Job_Applications
                    WHERE
                        js_id = 1 AND status IN ('R_CALLED')) actions ON applications.job_id = actions.job_id
                        AND applications.js_id = actions.js_id
                        ORDER BY last_tstamp DESC
    `;
  const applications = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements: { js_id: jobseeker_id },
  });
  return applications;
};

const changeApplicationStatus = async function (js_id, job_id, status) {
  const row = { js_id, job_id, status };
  const application = await Job_Application.findOrCreate({
    where: row,
    defaults: row,
  });
  return application;
};

module.exports = {
  APPLICATION_STATUS,
  getAppliedJobs,
  changeApplicationStatus,
};
