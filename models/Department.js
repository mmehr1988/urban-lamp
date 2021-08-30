'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {
  getDepartmentId() {
    return this.id;
  }
  getDepartmentName() {
    return this.id;
  }
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department',
  }
);

module.exports = Department;
