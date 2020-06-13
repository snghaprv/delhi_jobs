module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('Category', {
        id: {  type: DataTypes.STRING,
            primaryKey : true
        },
        label : DataTypes.STRING,
        helptext:DataTypes.STRING
    },{
        timestamps:false
    });

    Category.associate = function(models) {
         models.Category.belongsToMany(models.JobSeeker, {
            through: 'JobSeeker_Category',
            foreignKey: 'category_id',
            sourceKey: 'id'
        })
    }
    return Category;
};

