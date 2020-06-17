const moment = require("moment");
const {
  Job,
  Locality,
  City,
  Category,
  Qualification,
  Recruiter,
  Company,
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

const getOneJobDataForJobSeeker = async function (job_id) {
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
    {
      model: Recruiter,
      attributes: ["phone"],
      as: "recruiter",
      include: {
        model: Company,
        attributes: ["name", "address"],
        as: "company",
      },
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
    "updatedAt",
  ];
  let job = await Job.findOne({
    where: { id: job_id },
    include: inclusions,
    attributes: {
      exclude: exclusions,
    },
  });
  job = job.toJSON();
  job.gender = gender.find((g) => g.id == job.gender).label;
  job.working_days = working_days.find((wd) => wd.id == job.working_days).label;
  job.job_type = job_type.find((jt) => jt.id == job.job_type).label;
  job.skills = JSON.parse(job.skills);
  job.category = !!job.category ? job.category.label : null;
  job.locality = !!job.locality ? job.locality.label : null;
  job.qualification = !!job.qualification ? job.qualification.label : null;
  job.city = !!job.city ? job.city.label : null;
  job.posted_on_label = `Posted ${moment(job.createdAt).format(
    "DD"
  )}th ${moment(job.createdAt).format("MMM")} `;
  delete job.createdAt;
  return job;
};

const getJobsDataForJobSeeker = async function (job_ids) {
  const inclusions = [
    {
      model: Recruiter,
      attributes: ["id"],
      as: "recruiter",
      include: {
        model: Company,
        attributes: ["name", "address"],
        as: "company",
      },
    },
  ];

  let jobs = await Job.findAll({
    where: { id: job_ids },
    include: inclusions,
    attributes: ["title", "minimum_salary", "maximum_salary", "createdAt","id"],
  });
  jobs = jobs.map((job) => job.toJSON());
  jobs = jobs.map((job) => {
    job.posted_on_label = `Posted ${moment(job.createdAt).format(
      "DD"
    )}th ${moment(job.createdAt).format("MMM")} `;
    delete job.createdAt;
    return job;
  });
  return jobs;
};

module.exports = {
  createJob,
  getOneJobDataForJobSeeker,
  getJobsDataForJobSeeker,
};
