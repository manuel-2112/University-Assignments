const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'playerId',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
      this.hasMany(models.Course, {
        foreignKey: 'id',
      });
      this.hasOne(models.Odoc, {
        foreignKey: 'id',
      });
      this.hasOne(models.Meones, {
        foreignKey: 'id',
      });
      this.hasMany(models.Luck, {
        foreignKey: 'id',
      });
      this.hasOne(models.Communal, {
        foreignKey: 'id',
      });
    }
  }
  Board.init({
    playerId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};
