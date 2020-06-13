module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, unique: true },
  });
  return Company;
};
