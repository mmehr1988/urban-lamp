'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Employee = require('./Employee');
// const Role = require('./Role');

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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

// Department.belongsToMany(Employee, {
//   through: Role,
//   foreignKey: 'role_id',
// });

// Employee.hasOne(Department, {
//   through: Role,
//   foreignKey: 'role_id',
// });

module.exports = Department;
