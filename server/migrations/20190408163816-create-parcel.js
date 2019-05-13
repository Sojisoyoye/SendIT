module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Parcels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    placedBy: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      refrences: {
        model: 'Users',
        key: 'id',
        as: 'placedBy',
      }
    },
    weight: {
      type: Sequelize.FLOAT
    },
    weightmetric: {
      type: Sequelize.STRING
    },
    sentOn: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deliveredOn: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: Sequelize.STRING
    },
    from: {
      type: Sequelize.STRING
    },
    to: {
      type: Sequelize.STRING
    },
    currentLocation: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Parcels')
};
