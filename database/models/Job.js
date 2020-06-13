module.exports = (sequelize, DataTypes) => {
  var Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: { type: DataTypes.TEXT },
  });
  return Job;
};
