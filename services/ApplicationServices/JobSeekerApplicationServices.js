const { Job_Application,sequelize,Job_Application_Status,Sequelize } = require("../../database/models");
const Op = Sequelize.Op
const APPLICATION_STATUS = {
  JS_VIEWED: "JS_VIEWED",
  JS_CALLED: "JS_CALLED",
};
const getAppliedJobs = async function (jobseeker_id) {

  let applications = Job_Application_Status.findAll({
    where :{
      js_id:jobseeker_id,
      status : {
        [Op.in]: ["JS_CALLED", "R_CALLED"]
      }
    },
    attributes : ["job_id","status"],
    order: [['updatedAt', 'DESC']]
  })
  applications = applications.map(application =>application.toJSON())
  return applications;
};

const changeApplicationStatus = async function (js_id, job_id, status) {
  const row = { js_id, job_id, status };
  const application = await Job_Application.findOrCreate({
    where: row,
    defaults: row,
  });
  const application_status = [{...row, updatedAt : new Date(), status: "R_CALLED"}]
   await Job_Application_Status.bulkCreate(application_status,{
    updateOnDuplicate : ["status","updatedAt"]
   })
  return application;
};

module.exports = {
  APPLICATION_STATUS,
  getAppliedJobs,
  changeApplicationStatus,
};
