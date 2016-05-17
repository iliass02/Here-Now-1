/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorites', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    latitude: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    longitude: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'favorites'
  });
};
