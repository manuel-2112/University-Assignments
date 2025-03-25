const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Luck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: 'boardId',
      });
    }
  }
  Luck.init({
    description: DataTypes.STRING,
    factor: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Luck',
  });
  return Luck;
};
