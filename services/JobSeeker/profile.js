const filter = require("filter-object");
const {
  JobSeeker,
  Locality,
  City,
  Category,
  Qualification,
} = require("../../database/models");

// name will be devided into first_name, last_name.
const allowed_fields = [
  "name",
  "gender",
  "worked_before",
  "email",
  "qualification_id",
  "locality_id",
  "city_id",
  "Categories",
];

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

const editProfile = async function (jobseeker_id, fields) {

  let fields_to_update = filter(fields, allowed_fields)
  await JobSeeker.update(fields_to_update,{where:{id:jobseeker_id}})
  if(fields_to_update.Categories){
    const job = await JobSeeker.findOne({where:{id:jobseeker_id}})
    await job.setCategories(fields_to_update.Categories)
  }
};

;


module.exports = {
  getProfile,
  editProfile,
};
