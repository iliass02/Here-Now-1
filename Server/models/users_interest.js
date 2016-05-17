/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_interest', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    interest_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'interest',
        key: 'id'
      }
    }
  }, {
    tableName: 'users_interest'
  });
};
