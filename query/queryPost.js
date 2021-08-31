'use strict';

const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Role = require('../models/Role');

async function apiPostDepartment(depName) {
  try {
    const createDepartment = await Department.create({ name: depName }).then((data) => data.get({ raw: true }));
    return createDepartment;
  } catch (error) {
    console.log(error);
  }
}

async function apiPostRole(roleTitle, roleSalary, roleDepId) {
  try {
    const createRole = await Role.create({ title: roleTitle, salary: roleSalary, department_id: roleDepId }).then((data) => data.get({ raw: true }));
    return createRole;
  } catch (error) {
    console.log(error);
  }
}

async function apiPostEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  try {
    const createEmployee = await Employee.create({ first_name: employeeFirstName, last_name: employeeLastName, role_id: employeeRoleId, manager_id: employeeManagerId }).then((data) => data.get({ raw: true }));
    return createEmployee;
  } catch (error) {
    console.log(error);
  }
}

exports.apiPostDepartment = apiPostDepartment;
exports.apiPostRole = apiPostRole;
exports.apiPostEmployee = apiPostEmployee;
