module.exports = (sequelize, DataTypes) => {
  var Category_Skill = sequelize.define(
    "Category_Skill",
    {},
    {
      timestamps: false,
    }
  );

  return Category_Skill;
};
