module.exports = (sequelize, DataTypes) => {
    var Locality = sequelize.define('Locality', {
        id: {  type: DataTypes.INTEGER,
            primaryKey : true
        },
        label : DataTypes.STRING,
        latitude : DataTypes.FLOAT,
        longitude : DataTypes.FLOAT,
    },{
        timestamps:false
    });
    return Locality;
};