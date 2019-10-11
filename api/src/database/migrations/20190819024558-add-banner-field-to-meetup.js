module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('meetups', 'banner_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('meetups', 'banner_id');
  },
};
