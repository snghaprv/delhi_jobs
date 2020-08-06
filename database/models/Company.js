module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: { type: DataTypes.STRING },
    address : { type: DataTypes.STRING },
    registration_number: { type: DataTypes.STRING },
  });
  return Company;
};
