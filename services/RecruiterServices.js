const filter = require("filter-object");

const { Recruiter, Company,Job } = require("../database/models");

const editProfile = async function (recruiter_id, fields) {
  const { company } = fields;
  const { name, whatsapp_number, email } = fields;
  const recruiter_fields = { name, whatsapp_number, email };
  const company_fields = { name: company.name, address: company.address };
  const recruiter = await Recruiter.findOne({ where: { id: recruiter_id } });
  await recruiter.update(recruiter_fields);
  const company_id = recruiter.toJSON().company_id;
  await Company.update(company_fields, {
    where: {
      id: company_id,
    },
  });
};
const getProfile = async function (recruiter_id) {
  const data = await Recruiter.findOne({
    where: { id: recruiter_id },
    attributes: ["name", "whatsapp_number", "email", "phone"],
    include: {
      model: Company,
      attributes: ["name", "address"],
      as : "company"
    },
  });
  return data.toJSON()
};
const getLandingPage = async function(recruiter_id){
  const LANDING_SCREENS = {
    JOB_POST:"JOB_POST",
    EDIT_PROFILE :"EDIT_PROFILE",
    JOB_LIST:"JOB_LIST"
  }
  let landing_screen = null;
  const profile = await getProfile(recruiter_id);
  const jobs_count = await Job.count({where: {recruiter_id}})
  if(profile.name){
    landing_screen = LANDING_SCREENS.JOB_LIST
  } else if (jobs_count>0){
    landing_screen =LANDING_SCREENS.EDIT_PROFILE
  } else {
    landing_screen =LANDING_SCREENS.JOB_POST
  }
  return landing_screen;
}
module.exports = {
  editProfile,
  getProfile,
  getLandingPage
};
