'use strict';
const { timeoutMessage } = require('./Helper.js');
const { Department, Role, Employee } = require('../models');
require('console.table');

////////////////////////////////////////////////////////////
// DELETE | DEPARTMENT
////////////////////////////////////////////////////////////
async function deleteDepartment(name) {
  const departmentToDelete = await Department.findOne({ where: { name } }).then((data) => data.get({ raw: true }));

  await Department.destroy({ where: { name } });

  await timeoutMessage(`Deleting Department: ${name}`);

  console.table([departmentToDelete]);
}

////////////////////////////////////////////////////////////
// DELETE | ROLE
////////////////////////////////////////////////////////////
async function deleteRole(title) {
  const roleToDelete = await Role.findOne({ where: { title } }).then((data) => data.get({ raw: true }));

  await Role.destroy({ where: { title } });

  await timeoutMessage(`Deleting Role: ${title}`);

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

  await Employee.destroy({ where: { id: empId } });

  await timeoutMessage(`Deleting Employee: ${fullName}`);

  console.table(employeeData);
}

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////
exports.deleteEmployee = deleteEmployee;
exports.deleteDepartment = deleteDepartment;
exports.deleteRole = deleteRole;
