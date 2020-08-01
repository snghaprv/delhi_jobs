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
          const regex = /^[6789]\d{9}$/;
          if (value && !regex.test(value)) {
            throw new Error("INVALID_PHONE_NUMBER");
          }
        },
      },
    },
    whatsapp_number: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "INVALID_EMAIL",
        },
      },
    },
    is_call_allowed: DataTypes.BOOLEAN,
  });
  Recruiter.associate = function (models) {
    models.Recruiter.belongsTo(models.Company, {
      foreignKey: "company_id",
      sourceKey: "id",
      as :"company"
    });
  };

  return Recruiter;
};
