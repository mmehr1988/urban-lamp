'use strict';

const { Department, Role, Employee } = require('../models');

////////////////////////////////////////////////////////////
// GET = READ
////////////////////////////////////////////////////////////

async function dataQueryGetAll(url) {
  if (url === 'department') {
    const departments = await Department.findAll({ raw: true });
    return departments;
  } else if (url === 'role') {
    const roles = await Role.findAll({ raw: true });
    return roles;
  } else if (url === 'employee') {
    const employees = await Employee.findAll({ raw: true });
    return employees;
  } else {
    console.log('Something went wrong');
  }
}

////////////////////////////////////////////////////////////
// GET = READ RAW
////////////////////////////////////////////////////////////

async function dataQueryGetAllRaw(url) {
  if (url === 'department') {
    const departments = await Department.findAll({
      include: [{ model: Role }],
    });
    return departments;
  } else if (url === 'role') {
    const roles = await Role.findAll({
      include: [{ model: Employee }],
    });
    return JSON.stringify(roles);
  } else if (url === 'employee') {
    const employees = await Employee.findAll();
    return JSON.stringify(employees);
  } else {
    console.log('Something went wrong');
  }
}

////////////////////////////////////////////////////////////
// GET ONE = READ
////////////////////////////////////////////////////////////

async function dataQueryGetOne(url, id) {
  if (url === 'department') {
    const department = await Department.findOne({ where: { id } }).then((data) => data.get({ raw: true }));
    return department;
  } else if (url === 'role') {
    const role = await Role.findOne({ where: { id } }).then((data) => data.get({ raw: true }));
    return role;
  } else if (url === 'employee') {
    const employee = await Employee.findOne({ where: { id } }).then((data) => data.get({ raw: true }));
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

////////////////////////////////////////////////////////////
// DELETE = DESTROY
////////////////////////////////////////////////////////////

async function dataQueryDeleteMaster(url, id) {
  if (url === 'department') {
    const deleteDepartment = await Department.destroy({ where: { id } });
    return deleteDepartment;
  } else if (url === 'role') {
    const deleteRole = await Role.destroy({ where: { id } });
    return deleteRole;
  } else if (url === 'employee') {
    const deleteEmployee = await Employee.destroy({ where: { id } });
    return deleteEmployee;
  } else {
    console.log('Something went wrong');
  }
}

exports.dataQueryGetAll = dataQueryGetAll;
exports.dataQueryGetOne = dataQueryGetOne;
exports.dataQueryPostDepartment = dataQueryPostDepartment;
exports.dataQueryPostRole = dataQueryPostRole;
exports.dataQueryPostEmployee = dataQueryPostEmployee;
exports.dataQueryPutRole = dataQueryPutRole;
exports.dataQueryDeleteMaster = dataQueryDeleteMaster;
exports.dataQueryGetAllRaw = dataQueryGetAllRaw;
