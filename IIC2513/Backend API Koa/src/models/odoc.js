const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Odoc extends Model {
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
  Odoc.init({
    description: DataTypes.STRING,
    factor: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Odoc',
  });
  return Odoc;
};
