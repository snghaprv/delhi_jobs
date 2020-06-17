const {
    Recruiter,
    Company,
    sequelize
  } = require("../database/models");


const editProfile = async function (recruiter_id, recruiter_fields, company_fields) {

    const recruiter = await Recruiter.update(recruiter_fields, {
        where : {
            id :recruiter_id
        }
    })

};

module.exports = {
  editProfile,
};
