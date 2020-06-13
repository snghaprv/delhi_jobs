const {
  JobSeeker,
  Locality,
  City,
  Category,
  Qualification,
} = require("../../database/models");

// name will be devided into first_name, last_name.
const allowed_fields = ["name", "gender"];

const getProfile = async function (jobseeker_id) {
  const inclusions = [
    {
      model: Category,
      attributes: ["label", "id"],
      through: {
        attributes: [],
      },
    },
    {
      model: Locality,
      attributes: ["id", "label"],
    },
    {
      model: Qualification,
      attributes: ["id", "label"],
    },
    {
      model: City,
      attributes: ["id", "label"],
    },
  ];
  const jobseeker = await JobSeeker.findOne({
    where: {
      id: jobseeker_id,
    },
    include: inclusions,
  });
  return jobseeker.toJSON();
};


const editProfile = async function(jobseeker_id, fields ){


}

module.exports = {
  getProfile,
  editProfile
};
