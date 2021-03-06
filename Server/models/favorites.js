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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    place_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'favorites'
  });
};
