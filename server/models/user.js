
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    othernames: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    registered: DataTypes.DATE,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Parcel, {
      foreignKey: 'placedBy',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
