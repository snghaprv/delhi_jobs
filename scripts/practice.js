const { Recruiter } = require("../models");

const insertRecruiter = async function () {
  try {
    const recruiter = {
      first_name: "Apurv",
      last_name: "Singh",
      email: "null" ,
      phone: 9711923319
    };
    await Recruiter.create(recruiter);
  } catch (error) {
    console.log(error)
    console.log(error.error);
  }
};

//insertRecruiter();
