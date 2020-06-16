const {
  Job,
  Locality,
  City,
  Category,
  Qualification,
} = require("../database/models");

const Job_Post_Form = require("../dumps/Job_Post_Form.json");
const { gender, working_days, job_type } = Job_Post_Form;

const createJob = async function (job_data, recruiter_id) {
  const JOB_EXPIRY_IN_DAYS = 30;
  const status = "ACTIVE";
  const expiry_date = new Date().setDate(
    new Date().getDate() + JOB_EXPIRY_IN_DAYS
  );
  job_data = { ...job_data, recruiter_id, status, expiry_date };
  let { skills } = job_data;
  if (skills) {
    skills = JSON.stringify(skills);
    job_data = { ...job_data, skills };
  }

  const job = await Job.create(job_data);
  return job.id;
};

const getJobsDataForJobSeeker = async function (job_ids) {
  const inclusions = [
    {
      model: Category,
      attributes: ["label"],
      as: "category",
    },
    {
      model: Locality,
      attributes: ["label"],
      as: "locality",
    },
    {
      model: Qualification,
      attributes: ["label"],
      as: "qualification",
    },
    {
      model: City,
      attributes: ["label"],
      as: "city",
    },
  ];
  const exclusions = [
    "expiry_date",
    "status",
    "qualification_id",
    "city_id",
    "locality_id",
    "category_id",
    "recruiter_id",
    "createdAt",
    "updatedAt",
  ]
  let jobs = await Job.findAll({
    where: { id: job_ids },
    include: inclusions,
    attributes: {
      exclude:exclusions,
    },
  });
  jobs = jobs.map((job) => job.toJSON());
  jobs = jobs.map(formatJobDataForJobSeeker);
  return jobs;
};

const formatJobDataForJobSeeker = function (job) {
  job.gender = gender.find((g) => g.id == job.gender).label;
  job.working_days = working_days.find((wd) => wd.id == job.working_days).label;
  job.job_type = job_type.find((jt) => jt.id == job.job_type).label;
  job.skills = JSON.parse(job.skills);
  job.category = !!job.category ? job.category.label : null;
  job.locality = !!job.locality ? job.locality.label : null;
  job.qualification = !!job.qualification ? job.qualification.label : null;
  job.city = !!job.city ? job.city.label : null;
  return job;
};

const getOneJobDataForJobSeeker = async function (job_id) {
  let jobs = await getJobsDataForJobSeeker([job_id]);
  const [job] = jobs;
  return job;
};

module.exports = {
  createJob,
  getOneJobDataForJobSeeker,
  getJobsDataForJobSeeker,
};
