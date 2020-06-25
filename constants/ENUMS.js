// {Model:JobSeeker, Column: gender}
const JOB_SEEKER_GENDER = [
  { id: "MALE", label: "Male" },
  { id: "FEMALE", label: "Female" },
  { id: "OTHER", label: "Other" },
];

// {Model:Job, Column: gender}
const JOB_POST_GENDER = [
  { id: "ANY", label: "Any" },
  { id: "MALE", label: "Male" },
  { id: "FEMALE", label: "Female" },
];

// {Model:Job, Column: working_days}
const WORKING_DAYS = [
  { id: "5_DAYS_WORKING", label: "5 days working" },
  { id: "6_DAYS_WORKING", label: "6 days working" },
  { id: "OTHERS", label: "Others" },
];
// {Model:Job, Column: job_type}
const JOB_TYPE = [
  { id: "FULL_TIME", label: "Full time" },
  { id: "PART_TIME", label: "Part time" },
  { id: "CONTRACT", label: "Contract" },
  { id: "WORK_FROM_HOME", label: "Work from home" },
];

module.exports = {
  JOB_POST_GENDER,
  JOB_SEEKER_GENDER,
  JOB_TYPE,
  WORKING_DAYS,
};
