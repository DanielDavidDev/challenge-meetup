module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('meetups', 'banner_id', {
    type: Sequelize.INTEGER,
    references: { model: 'files', key: 'id' },
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }),

  down: (queryInterface) => queryInterface.removeColumn('meetups', 'banner_id'),
};
