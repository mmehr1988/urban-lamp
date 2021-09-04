'use strict';

const { Department, Role, Employee } = require('../models');
require('console.table');

////////////////////////////////////////////////////////////
// MANUAL PROMISE TIMEOUT
////////////////////////////////////////////////////////////

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function timeoutMessage(name) {
  console.log(`Deleting ${name}`);
  await timeout(2000);
  console.log('Successfully Deleted In Database!');
}

////////////////////////////////////////////////////////////
// DELETE | DEPARTMENT
////////////////////////////////////////////////////////////
async function deleteDepartment(name) {
  const departmentToDelete = await Department.findOne({ where: { name } }).then((data) => data.get({ raw: true }));
  await Department.destroy({ where: { name } });
  await timeoutMessage(`Department: ${name}`);
  console.table([departmentToDelete]);
}

////////////////////////////////////////////////////////////
// DELETE | ROLE
////////////////////////////////////////////////////////////
async function deleteRole(title) {
  const roleToDelete = await Role.findOne({ where: { title } }).then((data) => data.get({ raw: true }));
  await Role.destroy({ where: { title } });
  await timeoutMessage(`Role: ${title}`);
  console.table([roleToDelete]);
}

////////////////////////////////////////////////////////////
// DELETE | EMPLOYEE
////////////////////////////////////////////////////////////
async function deleteEmployee(fullName) {
  const empNameSplit = fullName.split(', ');
  const first_name = empNameSplit[1];
  const last_name = empNameSplit[0];

  const employeeData = await Employee.findAll({
    raw: true,
    where: { first_name, last_name },
  });

  const empId = await employeeData[0].id;

  await timeoutMessage(`Employee: ${fullName}`);
  await Employee.destroy({ where: { id: empId } });
  console.log('Successfully Deleted!');
  console.table(employeeData);
}

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////
exports.deleteEmployee = deleteEmployee;
exports.deleteDepartment = deleteDepartment;
exports.deleteRole = deleteRole;
