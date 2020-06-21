const moment = require("moment");
const {
  Job_Application,
  Job_Application_Status,
  Sequelize,
} = require("../../database/models");
const Op = Sequelize.Op;
const APPLICATION_STATUS = {
  JS_VIEWED: "JS_VIEWED",
  JS_CALLED: "JS_CALLED",
};
const getAppliedJobs = async function (jobseeker_id) {
  let applications = Job_Application_Status.findAll({
    where: {
      js_id: jobseeker_id,
      status: {
        [Op.in]: ["JS_CALLED", "R_CALLED"],
      },
    },
    attributes: ["job_id", "status","updatedAt"],
    order: [["updatedAt", "DESC"]],
  });
  applications = applications.map((application) => application.toJSON());
  applications = applications.map((application) => {
    application.last_action_label = `You called ${moment(application.updatedAt).fromNow(true)} ago` ;
    delete application.updatedAt
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
  if (status == APPLICATION_STATUS.JS_CALLED) {
    const application_status = [{ ...row, updatedAt: new Date() }];
    await Job_Application_Status.bulkCreate(application_status, {
      ignoreDuplicates: true,
    });
  }
  return application;
};

module.exports = {
  APPLICATION_STATUS,
  getAppliedJobs,
  changeApplicationStatus,
};
