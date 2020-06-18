const filter = require("filter-object");

const { Recruiter, Company } = require("../database/models");

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

module.exports = {
  editProfile,
  getProfile
};
