const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  var Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    no_of_openings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        max: 9999,
      },
    },
    gender: DataTypes.ENUM("MALE", "FEMALE","ANY"),
    minimum_experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maximum_experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minimum_salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 999,
        max: 99999,
      },
    },
    maximum_salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 999,
        max: 99999,
      },
    },
    incentives_applicable: DataTypes.BOOLEAN,
    skills : {
      type:DataTypes.STRING,
      validate : {
        max:255
      }
    },
    shift_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
      validate : {
        isTimeValid(value){
          if(value && !moment(value, "HH:mm").isValid()){
            throw new Error("INVALID_TIME_FORMAT");
          }
        }
      }
    },
    shift_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
      validate : {
        isTimeValid(value){
          if(value && !moment(value, "HH:mm").isValid()){
            throw new Error("INVALID_TIME_FORMAT");
          }
        }
      }
    },
    job_address: DataTypes.STRING,
    working_days: {
      type: DataTypes.ENUM(
        "5_DAYS_WORKING",
        "6_DAYS_WORKING",
        "OTHERS"
      ),
    },
    job_type: {
      type: DataTypes.ENUM(
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "WORK_FROM_HOME"
      ),
    },
    other_city : DataTypes.STRING,
    status : {
      type: DataTypes.ENUM(
        "ACTIVE",
        "DEACTIVATED",
        "BLOCKED",
        "EXPIRED"
      ),
    },
    expiry_date: {
      type: DataTypes.DATEONLY
    }
  });

  Job.addHook('beforeValidate', 'Salary Validator', (job, options) => {
      job = job.toJSON();
     const  {minimum_salary,maximum_salary} = job;
     if(Number(minimum_salary) >Number(maximum_salary)){
      return Promise.reject(new Error("minimum Salary should be less than maximum salary."));
     }
  });
  Job.addHook('beforeValidate', 'Experience Validator', (job, options) => {
    job = job.toJSON();
   const  {minimum_experience,maximum_experience} = job;
   if(Number(minimum_experience) >Number(maximum_experience)){
    return Promise.reject(new Error("minimum Experience should be less than maximum salary."));
   }
});

  Job.associate = function (models) {
    models.Job.belongsTo(models.Qualification, {
      foreignKey: "qualification_id",
      sourceKey: "id",
      as :"qualification"
    });
    models.Job.belongsTo(models.Locality, {
      foreignKey: "locality_id",
      sourceKey: "id",
      as : "locality"
    });
    models.Job.belongsTo(models.City, {
      foreignKey: "city_id",
      sourceKey: "id",
      as : "city"
    });
    models.Job.belongsTo(models.Category, {
      foreignKey: "category_id",
      sourceKey: "id",
      as :"category"
    });
    models.Job.belongsTo(models.Recruiter, {
      foreignKey: "recruiter_id",
      sourceKey: "id",
      as : "recruiter"
    });
    models.Job.belongsToMany(models.Skill, {
      through: "Job_Skills",
      foreignKey: "job_id",
      sourceKey: "id",
    });
    models.Job.belongsToMany(models.JobSeeker, {
      through: "Job_Application_Status",
      foreignKey: "job_id",
      sourceKey: "id",
    });
  };
  
  return Job;
};
