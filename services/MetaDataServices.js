const cities = require("../dumps/Cities.json");
const categories = require("../dumps/Categories.json");
const qualifications = require("../dumps/Qualifications.json");
const localities = require("../dumps/Localities.json");
const languages = require("../dumps/Languages.json");
const job_post_form = require("../dumps/Job_Post_Form.json")
const gender = [
  { id: "MALE", label: "Male" },
  { id: "FEMALE", label: "Female" },
];

const getJobPostForMetaData = async function () {
  return {...job_post_form,localities,cities,categories};
};

const getJobSeekerRegistrationMetaData = async function () {
  const metadata = {
    cities,
    categories,
    qualifications,
    localities,
    gender,
    languages,
  };
  return metadata;
};

module.exports = {
  getJobPostForMetaData,
  getJobSeekerRegistrationMetaData,
};
