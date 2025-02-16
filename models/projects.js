'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projects.init({
    projectName: DataTypes.STRING,
    startAt: DataTypes.DATEONLY,
    endAt: DataTypes.DATEONLY,
    desc: DataTypes.TEXT,
    tech: DataTypes.ARRAY(DateTypes.STRING),
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};