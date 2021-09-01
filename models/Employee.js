'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./Role');

class Employee extends Model {}

Employee.init(
  {
    //     COMPLETE id INTEGER NOT NULL AUTO_INCREMENT,
    id: {
      type: DataTypes.INTEGER,
      //     COMPLETE PRIMARY KEY (id),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    //     COMPLETE first_name VARCHAR(30) NOT NULL,
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //     COMPLETE last_name VARCHAR(30) NOT NULL,
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //     COMPLETE role_id INTEGER NOT NULL,
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //     COMPLETE FOREIGN KEY (role_id) REFERENCES role(id),
      references: {
        model: 'role',
        key: 'id',
      },
    },
    //     COMPLETE manager_id INTEGER,
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

//     COMPLETE FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
Employee.belongsTo(Employee, {
  foreignKey: 'manager_id',
  as: 'employee',
});

Employee.hasMany(Employee, {
  foreignKey: 'manager_id',
  as: 'manager',
});

Role.hasMany(Employee, {
  foreignKey: 'role_id',
});

Employee.belongsTo(Role, {
  foreignKey: 'role_id',
});

module.exports = Employee;
