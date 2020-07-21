const moment = require("moment");
const {
  Job,
  Locality,
  City,
  Category,
  Qualification,
  Recruiter,
  Company,
  sequelize,
} = require("../database/models");
const ApplicationServices = require("./ApplicationServices");
const { RecruiterApplicationServices } = ApplicationServices;
const {
  JOB_POST_GENDER,
  WORKING_DAYS,
  JOB_TYPE,
} = require("../constants/ENUMS");

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
      attributes: ["phone","whatsapp_number"],
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
  job.gender = !!job.gender?  JOB_POST_GENDER.find((g) => g.id == job.gender).label:job.gender;
  job.working_days = !!job.working_days  ? WORKING_DAYS.find((wd) => wd.id == job.working_days).label:job.working_days ;
  job.job_type = !!job.job_type ? JOB_TYPE.find((jt) => jt.id == job.job_type).label:job.job_type;
  job.skills = !!job.skills ? JSON.parse(job.skills): null;
  job.category = !!job.category ? job.category.label : null;
  job.locality = !!job.locality ? job.locality.label : null;
  job.qualification = !!job.qualification ? job.qualification.label : null;
  job.city = !!job.city ? job.city.label : null;
  job.posted_on_label = moment(job.createdAt).format("[Posted on] Do MMM YYYY")
  job.shift_start_time = moment(job.shift_start_time, "HH:mm").isValid()
    ? moment(job.shift_start_time, "HH:mm").format("hh:mm A")
    : null;
  job.shift_end_time = moment(job.shift_end_time, "HH:mm").isValid()
    ? moment(job.shift_end_time, "HH:mm").format("hh:mm A")
    : null;
    let {whatsapp_number} = job.recruiter
  job.whatsapp_link = !!whatsapp_number ? `https://api.whatsapp.com/send?phone=91${whatsapp_number}` : null;
  delete job.recruiter.whatsapp_number;  
  delete job.createdAt;
  return job;
};

const getJobsDataForJobSeeker = async function (job_ids) {
  if (job_ids.length == 0) {
    return [];
  }

  const inclusions = [
    {
      model: Recruiter,
      attributes: ["id"],
      as: "recruiter",
      include: {
        model: Company,
        attributes: ["name"],
        as: "company",
      },
    },  {
      model: Locality,
      attributes: ["id", "label"],
      as: "locality",
    },
    {
      model: City,
      attributes: ["id", "label"],
      as: "city",
    }
  ];

  let jobs = await Job.findAll({
    where: { id: job_ids },
    include: inclusions,
    attributes: [
      "title",
      "minimum_salary",
      "maximum_salary",
      "createdAt",
      "id",
    ],
    order: [[sequelize.fn("FIELD", sequelize.col("Job.id"), job_ids)]],
  });
  jobs = jobs.map((job) => job.toJSON());
  jobs = jobs.map((job) => {
    job.posted_on_label = moment(job.createdAt).format("[Posted on] Do MMM YYYY")
    delete job.createdAt;
    let addressArray = [];
    if(job.locality && job.locality.label){
      addressArray.push(job.locality.label)
    }
    if(job.city && job.city.label){
      addressArray.push(job.city.label)
    }
    let address = addressArray.join(", ")
    delete job.locality;
    delete job.city
    return {...job,address};
  });
  return jobs;
};

const getJobsPostedByRecruiter = async function (recruiter_id) {
  const today = moment();
  const inclusions = [
    {
      model: Recruiter,
      attributes: ["id"],
      as: "recruiter",
      include: {
        model: Company,
        attributes: ["name"],
        as: "company",
      },
    },
  ];
  let jobs = await Job.findAll({
    where: {
      recruiter_id,
    },
    include: inclusions,
    attributes: ["title", "id", "expiry_date", "status","createdAt"],
    order: [["updatedAt", "DESC"]]
  });
  jobs = jobs.map((job) => job.toJSON());
  jobs = jobs.map((job) => {
  job.posted_on_label = moment(job.createdAt).format("[Posted on] Do MMM YYYY");
  delete job.createdAt;
    return job;
  });
  const job_ids = jobs.map(({ id }) => id);
  const application_counts = await RecruiterApplicationServices.getApplicationCountForJobs(
    job_ids
  );
  jobs = jobs.map((job) => {
    let { application_count } = application_counts.find(
      (application_count) => application_count.job_id == job.id
    );
    job.application_count = application_count;
    return job;
  });

  const active_jobs = jobs.filter(
    (job) => job.status == "ACTIVE" && moment(job.expiry_date) >= today
  );
  const inactive_jobs = jobs.filter(
    (job) => !(job.status == "ACTIVE" && moment(job.expiry_date) >= today)
  );
  return { active_jobs, inactive_jobs };
};
const getJobPostedByRecruiter = async function (job_id) {
  const inclusions = [
    {
      model: Category,
      attributes: ["label", "id"],
      as: "category",
    },
    {
      model: Locality,
      attributes: ["id", "label","minimum_wage"],
      as: "locality",
    },
    {
      model: Qualification,
      attributes: ["id", "label"],
      as: "qualification",
    },
    {
      model: City,
      attributes: ["id", "label"],
      as: "city",
    },
  ];
  let job = await Job.findOne({
    where: {
      id: job_id,
    },
    include: inclusions,
    attributes: [
      "id",
      "title",
      "description",
      "no_of_openings",
      "gender",
      "minimum_experience",
      "maximum_experience",
      "minimum_salary",
      "maximum_salary",
      "incentives_applicable",
      "skills",
      "shift_start_time",
      "shift_end_time",
      "job_address",
      "working_days",
      "job_type",
      "other_city",
    ],
  });
  job = job.toJSON();
  job.working_days = WORKING_DAYS.find((wd) => wd.id == job.working_days);
  job.job_type = JOB_TYPE.find((jt) => jt.id == job.job_type);
  job.gender = JOB_POST_GENDER.find((g) => g.id == job.gender);
  job.skills = JSON.parse(job.skills);
  return job;
};
const editJob = async function (job_data, job_id) {
  job_data = { ...job_data };
  let { skills } = job_data;
  if (skills) {
    skills = JSON.stringify(skills);
    job_data = { ...job_data, skills };
  }

  const job = await Job.update(job_data, {
    where: {
      id: job_id,
    },
  });
  return job_id;
};

module.exports = {
  createJob,
  getOneJobDataForJobSeeker,
  getJobsDataForJobSeeker,
  getJobsPostedByRecruiter,
  getJobPostedByRecruiter,
  editJob,
};
