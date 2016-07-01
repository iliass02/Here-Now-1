/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('opinions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    interest_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_post: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'opinions'
  });
};
