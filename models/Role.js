'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Department = require('./Department');

class Role extends Model {
  getRoleId() {
    return this.id;
  }
  getRoleTitle() {
    return this.id;
  }
  getRoleSalary() {
    return this.id;
  }
  getRoleDepartment() {
    return this.id;
  }
}

Role.init(
  {
    // id INTEGER NOT NULL AUTO_INCREMENT
    id: {
      type: DataTypes.INTEGER,
      // PRIMARY KEY (id),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // title VARCHAR(30) NOT NULL,
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    // salary DECIMAL(15,2) NOT NULL,
    salary: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
  }
);

// FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
Role.belongsTo(Department, {
  foreignKey: 'department_id',
});

module.exports = Role;
