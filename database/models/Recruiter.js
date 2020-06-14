module.exports = (sequelize, DataTypes) => {
  var Recruiter = sequelize.define("Recruiter", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
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
    other_phone: { type: DataTypes.STRING },
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
  Recruiter.associate = function (models) {
    models.Recruiter.belongsTo(models.Company, {
      foreignKey: "company_id",
      sourceKey: "id",
    });
  };

  return Recruiter;
};
