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
      type:DataTypes.STRING
    },
    shift_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    shift_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
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

  Job.associate = function (models) {
    models.Job.belongsTo(models.Qualification, {
      foreignKey: "qualification_id",
      sourceKey: "id",
    });
    models.Job.belongsTo(models.Locality, {
      foreignKey: "locality_id",
      sourceKey: "id",
    });
    models.Job.belongsTo(models.City, {
      foreignKey: "city_id",
      sourceKey: "id",
    });
    models.Job.belongsTo(models.Category, {
      foreignKey: "category_id",
      sourceKey: "id",
    });
    models.Job.belongsTo(models.Recruiter, {
      foreignKey: "recruiter_id",
      sourceKey: "id",
    });
    models.Job.belongsToMany(models.Skill, {
      through: "Job_Skills",
      foreignKey: "job_id",
      sourceKey: "id",
    });
  };
  
  return Job;
};
