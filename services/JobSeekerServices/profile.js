const filter = require("filter-object");
const {
  JobSeeker,
  Locality,
  City,
  Category,
  Qualification,
  Language,
  sequelize
} = require("../../database/models");
const { JOB_SEEKER_GENDER} = require("../../constants/ENUMS");

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
  "other_city",
  "is_english_proficient"
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
  jobseeker.gender =  jobseeker.gender ? JOB_SEEKER_GENDER.find(g => g.id ==jobseeker.gender ) : null;
  return jobseeker;
};

const editProfile = async function (jobseeker_id, fields) {

  let fields_to_update = filter(fields, allowed_fields)
  await JobSeeker.update(fields_to_update,{where:{id:jobseeker_id}})
  if(fields_to_update.categories){
    const jobseeker = await JobSeeker.findOne({where:{id:jobseeker_id}})
    await jobseeker.setCategories(fields_to_update.categories)
    
  }
};

const deleteProfile = async function(jobseeker_id){
  await JobSeeker.update({phone:null},{where:{id:jobseeker_id}})
}

const getApplicantsProfile = async function(applicant_ids){
  if(applicant_ids.length ==0){
    return []
  }
  const inclusions = [
    {
      model: Locality,
      attributes: ["label"],
      as: "locality"
    },
    {
      model: Qualification,
      attributes: ["label"],
      as : "qualification"
    },
    {
      model: City,
      attributes: ["label"],
      as : "city"
    },
    {
      model: Language,
      attributes: ["label"],
      as :"language"
    }
  ];
  let applicants = await JobSeeker.findAll({
    where: {
      id: applicant_ids,
    },
    include: inclusions,
    attributes:["name","gender","worked_before","id","phone","is_english_proficient"],
    order: [[sequelize.fn("FIELD", sequelize.col("JobSeeker.id"), applicant_ids)]]
  });
  applicants = applicants.map(applicant => applicant.toJSON())
  applicants = applicants.map (applicant => {
    applicant.gender = applicant.gender ? JOB_SEEKER_GENDER.find(g => g.id == applicant.gender).label : null;
    applicant.locality = applicant.locality ? applicant.locality.label : null;
    applicant.qualification = applicant.qualification ? applicant.qualification.label : null;
    applicant.city = applicant.city ? applicant.city.label : null;
    applicant.language = applicant.language ? applicant.language.label : null;
    return applicant
  })
  return applicants;
}

module.exports = {
  getProfile,
  editProfile,
  deleteProfile,
  getApplicantsProfile
};
