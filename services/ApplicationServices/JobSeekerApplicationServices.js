const moment = require("moment");
const {
  Job_Application,
  Job_Application_Status,
  Sequelize,
} = require("../../database/models");
const Op = Sequelize.Op;
const JS_LAST_ACTION = {
  JS_CALLED: "JS_CALLED",
  JS_WHATSAPP: "JS_WHATSAPP",
};
const R_LAST_ACTION = {
  R_CALLED: "R_CALLED",
  R_REJECTED: "R_REJECTED",
};
const getAppliedJobs = async function (jobseeker_id) {
  let applications = Job_Application_Status.findAll({
    where: {
      js_id: jobseeker_id,
      js_last_action: {
        [Op.in]: [JS_LAST_ACTION.JS_CALLED, JS_LAST_ACTION.JS_WHATSAPP],
      },
      r_last_action: {
        [Op.or] : [{[Op.in]: [R_LAST_ACTION.R_CALLED]}, {[Op.is]: null}],
      }
    },
    attributes: ["job_id", "js_last_action", "r_last_action", "updatedAt"],
    order: [["updatedAt", "DESC"]],
  });
  applications = applications.map((application) => application.toJSON());
  applications = applications.map((application) => {
    let last_action_label;
    let status; // last_action_label color is determined by this. 
    if(!application.r_last_action ){
       last_action_label = `You contacted ${moment(application.updatedAt).fromNow(
        true
      )} ago`;
      status =JS_LAST_ACTION.JS_CALLED 
    } else {
      last_action_label = `Recruiter contacted you ${moment(
        application.updatedAt
      ).fromNow(true)} ago`;
      status = R_LAST_ACTION.R_CALLED
    }
    application.last_action_label = last_action_label;
    application.status =status;
    delete application.updatedAt;
    delete application.js_last_action;
    delete application.r_last_action;
    return application;
  });
  return applications;
};

const changeApplicationStatus = async function (js_id, job_id, status) {
  const row = { js_id, job_id, status };
  const application = await Job_Application.findOrCreate({
    where: row,
    defaults: row,
  });
  if ([JS_LAST_ACTION.JS_CALLED,JS_LAST_ACTION.JS_WHATSAPP].includes(status)) {
    const application_status = [{ js_id,job_id,js_last_action:status, updatedAt: new Date() }];
    await Job_Application_Status.bulkCreate(application_status, {
      updateOnDuplicate: ["js_last_action","updatedAt"],
    });
  }
  return application;
};

module.exports = {
  JS_LAST_ACTION,
  R_LAST_ACTION,
  getAppliedJobs,
  changeApplicationStatus,
};
