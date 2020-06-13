module.exports = (sequelize, DataTypes) => {
    var City = sequelize.define('City', {
        id: {  type: DataTypes.STRING,
            primaryKey : true
        },
        label : DataTypes.STRING,
    },{
        timestamps:false
    });
    City.associate = function(models) {
        models.City.hasMany(models.Locality, { foreignKey :'city_id' , sourceKey: 'id' });
    };
    return City;
};
