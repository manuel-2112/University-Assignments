const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: 'boardId',
      });
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
    }
  }
  Course.init({
    name: DataTypes.STRING,
    rent: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    position: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
