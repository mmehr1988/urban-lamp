'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {
  getEmployeeName() {
    return [this.first_name, this.last_name].join(' ');
  }
  getEmployeeId() {
    return this.id;
  }
  getEmployeeRoleId() {
    return this.role_id;
  }
  getEmployeeManagerId() {
    return this.manager_id;
  }
}

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
});

module.exports = Employee;
