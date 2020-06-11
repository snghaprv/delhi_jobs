module.exports = (sequelize, DataTypes) => {
  var JobSeeker = sequelize.define("JobSeeker", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        IndianPhoneNumber(value) {
          const regex = /^[789]\d{9}$/;
          if (value && !regex.test(value)) {
            throw new Error("INVALID_PHONE_NUMBER");
          }
        },
      },
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    gender: DataTypes.ENUM("MALE", "FEMALE"),
    current_salary: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "INVALID_EMAIL",
        },
      },
    },
  });
  return JobSeeker;
};
