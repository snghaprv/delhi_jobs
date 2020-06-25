module.exports = (sequelize, DataTypes) => {
  var JobSeeker = sequelize.define("JobSeeker", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        IndianPhoneNumber(value) {
          const regex = /^[6789]\d{9}$/;
          if (value && !regex.test(value)) {
            throw new Error("INVALID_PHONE_NUMBER");
          }
        },
      },
    },
    name: DataTypes.STRING,
    gender: DataTypes.ENUM("MALE", "FEMALE","OTHER"),
    worked_before: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "INVALID_EMAIL",
        },
      },
    },
    other_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_english_proficient: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  });
  JobSeeker.associate = function (models) {
    models.JobSeeker.belongsTo(models.Qualification, {
      foreignKey: "qualification_id",
      sourceKey: "id",
      as: "qualification"
    });
    models.JobSeeker.belongsTo(models.Locality, {
      foreignKey: "locality_id",
      sourceKey: "id",
      as: "locality"
    });
    models.JobSeeker.belongsTo(models.City, {
      foreignKey: "city_id",
      sourceKey: "id",
      as: "city"
    });
    models.JobSeeker.belongsTo(models.Language, {
      foreignKey: "language_id",
      sourceKey: "id",
      as : "language"
    });
    models.JobSeeker.belongsToMany(models.Category, {
      through: "JobSeeker_Categories",
      foreignKey: "js_id",
      sourceKey: "id",
      as : "categories"
    });
    models.JobSeeker.belongsToMany(models.Job, {
      through: "Job_Application_Status",
      foreignKey: "js_id",
      sourceKey: "id",
    });
  };
  return JobSeeker;
};
