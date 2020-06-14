module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('Category', {
        id: {  type: DataTypes.INTEGER,
            primaryKey : true
        },
        label : DataTypes.STRING,
        helptext:DataTypes.STRING
    },{
        timestamps:false
    });

    Category.associate = function(models) {
         models.Category.belongsToMany(models.JobSeeker, {
            through: 'JobSeeker_Categories',
            foreignKey: 'category_id',
            sourceKey: 'id'
        })
        models.Category.belongsToMany(models.Skill, {
            through: "Category_Skills",
            foreignKey: "category_id",
            sourceKey: "id",
          });
    }
    return Category;
};

