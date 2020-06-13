module.exports = (sequelize, DataTypes) => {
    var Locality = sequelize.define('Locality', {
        id: {  type: DataTypes.STRING,
            primaryKey : true
        },
        label : DataTypes.STRING,
        latitude : DataTypes.FLOAT,
        longitude : DataTypes.FLOAT,
    });
    return Locality;
};