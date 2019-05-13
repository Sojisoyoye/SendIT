
module.exports = (sequelize, DataTypes) => {
  const Parcel = sequelize.define('Parcel', {
    placedBy: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    weightmetric: DataTypes.STRING,
    sentOn: DataTypes.DATE,
    deliveredOn: DataTypes.DATE,
    status: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    currentLocation: DataTypes.STRING
  }, {});
  Parcel.associate = (models) => {
    // associations can be defined here
    Parcel.belongsTo(models.User, {
      foreignKey: 'placedBy',
      onDelete: 'CASCADE',
    });
  };
  return Parcel;
};
