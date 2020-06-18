const cities = require("../dumps/Cities.json");
const categories = require("../dumps/Categories.json");
const qualifications = require("../dumps/Qualifications.json");
const localities = require("../dumps/Localities.json");
const languages = require("../dumps/Languages.json");
const {
  JOB_POST_GENDER,
  JOB_SEEKER_GENDER,
  JOB_TYPE,
  WORKING_DAYS,
} = require("../constants/ENUMS");

const getJobPostForMetaData = async function () {
  return {
    job_type: JOB_TYPE,
    working_days: WORKING_DAYS,
    gerder: JOB_POST_GENDER,
    localities,
    cities,
    categories,
    qualifications,
  };
};

const getJobSeekerRegistrationMetaData = async function () {
  const metadata = {
    cities,
    categories,
    qualifications,
    localities,
    gender: JOB_SEEKER_GENDER,
    languages,
  };
  return metadata;
};

module.exports = {
  getJobPostForMetaData,
  getJobSeekerRegistrationMetaData,
};
