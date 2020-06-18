const filter = require("filter-object");
const {
  JobSeeker,
  Locality,
  City,
  Category,
  Qualification,
  Language
} = require("../../database/models");
const { gender} = require("../../dumps/Job_Post_Form.json");

const allowed_fields = [
  "name",
  "gender",
  "worked_before",
  "email",
  "qualification_id",
  "locality_id",
  "city_id",
  "categories",
  "language_id",
  "other_city"
];

const getProfile = async function (jobseeker_id) {
  const inclusions = [
    {
      model: Category,
      attributes: ["label", "id"],
      through: {
        attributes: [],
      },
      as:"categories"
    },
    {
      model: Locality,
      attributes: ["id", "label"],
      as: "locality"
    },
    {
      model: Qualification,
      attributes: ["id", "label"],
      as : "qualification"
    },
    {
      model: City,
      attributes: ["id", "label"],
      as : "city"
    },
    {
      model: Language,
      attributes: ["id", "label"],
      as :"language"
    }
  ];
  let jobseeker = await JobSeeker.findOne({
    where: {
      id: jobseeker_id,
    },
    include: inclusions,
    attributes:{
      exclude : ["qualification_id","locality_id","city_id","category_id","language_id", "createdAt", "updatedAt"]
    }
  });
  
  jobseeker = jobseeker.toJSON();
  jobseeker.gender = gender.find(g => g.id ==jobseeker.gender )
  return jobseeker;
};

const editProfile = async function (jobseeker_id, fields) {

  let fields_to_update = filter(fields, allowed_fields)
  await JobSeeker.update(fields_to_update,{where:{id:jobseeker_id}})
  if(fields_to_update.categories){
    const job = await JobSeeker.findOne({where:{id:jobseeker_id}})
    await job.setCategories(fields_to_update.categories)
    
  }
};

const deleteProfile = async function(jobseeker_id){
  await JobSeeker.update({phone:null},{where:{id:jobseeker_id}})
}

module.exports = {
  getProfile,
  editProfile,
  deleteProfile
};
