'use strict';

const apiGet = require('./queryGet.js');
const { apiPostDepartment, apiPostRole, apiPostEmployee } = require('./queryPost.js');
const { apiPutRole } = require('./queryPut.js');

////////////////////////////////////////////////////////////
// GET + POST + PUT + DELETE
////////////////////////////////////////////////////////////

// GET data
async function dataQueryGet(url) {
  const getQuery = await apiGet.getData(url);
  return getQuery;
}

// Post Department
async function dataQueryPostDepartment(url, depName) {
  const postQueryDepartment = await apiPostDepartment.postDataDepartment(url, depName);
  return postQueryDepartment;
}

// Post Role
async function dataQueryPostRole(url, roleTitle, roleSalary, roleDepId) {
  const postQueryRole = await apiPostRole.postDataRole(url, roleTitle, roleSalary, roleDepId);
  return postQueryRole;
}

// Post Employee
async function dataQueryPostEmployee(url, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  const postQueryEmployee = await apiPostEmployee.postDataEmployee(url, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
  return postQueryEmployee;
}

// Put Employee
async function dataQueryPutRole(url, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  const putQueryRole = await apiPutRole.updateEmployeeRole(url, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
  return putQueryRole;
}

exports.dataQueryGet = dataQueryGet;
exports.dataQueryPostDepartment = dataQueryPostDepartment;
exports.dataQueryPostRole = dataQueryPostRole;
exports.dataQueryPostEmployee = dataQueryPostEmployee;
exports.dataQueryPutRole = dataQueryPutRole;
