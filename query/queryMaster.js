'use strict';

////////////////////////////////////////////////////////////
// GET = READ
////////////////////////////////////////////////////////////
const { directGetAll } = require('./queryGet.js');
// COMPLETE
async function dataQueryGetAll(url) {
  const getQuery = await directGetAll(url);
  return getQuery;
}

////////////////////////////////////////////////////////////
// POST = CREATE
////////////////////////////////////////////////////////////

const { apiPostDepartment, apiPostRole, apiPostEmployee } = require('./queryPost.js');

// DEPARTMENT COMPLETE
async function dataQueryPostDepartment(depName) {
  const postQueryDepartment = await apiPostDepartment(depName);
  return postQueryDepartment;
}

// ROLE COMPLETE
async function dataQueryPostRole(roleTitle, roleSalary, roleDepId) {
  const postQueryRole = await apiPostRole(roleTitle, roleSalary, roleDepId);
  return postQueryRole;
}

// EMPLOYEE COMPLETE
async function dataQueryPostEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  const postQueryEmployee = await apiPostEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
  return postQueryEmployee;
}

////////////////////////////////////////////////////////////
// PUT = UPDATE
////////////////////////////////////////////////////////////

const { apiPutRole } = require('./queryPut.js');

// EMPLOYEE ROLE UPDATE COMPLETE
async function dataQueryPutRole(employeeId, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  const putQueryRole = await apiPutRole(employeeId, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
  return putQueryRole;
}

exports.dataQueryGetAll = dataQueryGetAll;
exports.dataQueryPostDepartment = dataQueryPostDepartment;
exports.dataQueryPostRole = dataQueryPostRole;
exports.dataQueryPostEmployee = dataQueryPostEmployee;
exports.dataQueryPutRole = dataQueryPutRole;
