'use strict';

const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Role = require('../models/Role');

////////////////////////////////////////////////////////////
// GET = READ
////////////////////////////////////////////////////////////

async function dataQueryGetAll(url) {
  if (url === 'department') {
    const departments = await Department.findAll({ raw: true });
    return departments;
  } else if (url === 'role') {
    const role = await Role.findAll({ raw: true });
    return role;
  } else if (url === 'employee') {
    const employee = await Employee.findAll({ raw: true });
    return employee;
  } else {
    console.log('Something went wrong');
  }
}

////////////////////////////////////////////////////////////
// POST = CREATE
////////////////////////////////////////////////////////////

// DEPARTMENT
async function dataQueryPostDepartment(depName) {
  try {
    const createDepartment = await Department.create({ name: depName }).then((data) => data.get({ raw: true }));
    return createDepartment;
  } catch (error) {
    console.log(error);
  }
}

// ROLE
async function dataQueryPostRole(roleTitle, roleSalary, roleDepId) {
  try {
    const createRole = await Role.create({ title: roleTitle, salary: roleSalary, department_id: roleDepId }).then((data) => data.get({ raw: true }));
    return createRole;
  } catch (error) {
    console.log(error);
  }
}

// EMPLOYEE
async function dataQueryPostEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  try {
    const createEmployee = await Employee.create({ first_name: employeeFirstName, last_name: employeeLastName, role_id: employeeRoleId, manager_id: employeeManagerId }).then((data) => data.get({ raw: true }));
    return createEmployee;
  } catch (error) {
    console.log(error);
  }
}

////////////////////////////////////////////////////////////
// PUT = UPDATE
////////////////////////////////////////////////////////////

// EMPLOYEE ROLE UPDATE
async function dataQueryPutRole(employeeId, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  try {
    const updateEmployee = await Employee.findOne({ where: { id: employeeId } });

    updateEmployee.first_name = employeeFirstName;
    updateEmployee.last_name = employeeLastName;
    updateEmployee.role_id = employeeRoleId;
    updateEmployee.manager_id = employeeManagerId;

    const saveUpdateEmployee = await updateEmployee.save().then((data) => data.get({ raw: true }));

    return saveUpdateEmployee;
  } catch (error) {
    console.log(error);
  }
}

exports.dataQueryGetAll = dataQueryGetAll;
exports.dataQueryPostDepartment = dataQueryPostDepartment;
exports.dataQueryPostRole = dataQueryPostRole;
exports.dataQueryPostEmployee = dataQueryPostEmployee;
exports.dataQueryPutRole = dataQueryPutRole;
