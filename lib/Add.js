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
  console.log(`Building ${name}`);
  await timeout(2000);
  console.log('Successfully Added To Database!');
}

////////////////////////////////////////////////////////////
// POST | DEPARTMENT
////////////////////////////////////////////////////////////

async function addDepartment(name) {
  const createDepartment = await Department.create({ name }).then((data) => data.get({ raw: true }));
  await timeoutMessage('Department');
  console.table([createDepartment]);
}

////////////////////////////////////////////////////////////
// POST | ROLE
////////////////////////////////////////////////////////////

async function addRole(title, salary, name) {
  const dataChoices = await Department.findAll({ raw: true, where: { name } });
  const department_id = dataChoices[0].id;
  const postRole = await Role.create({ title, salary, department_id }).then((data) => data.get({ raw: true }));
  await timeoutMessage('Role');
  console.table([postRole]);
}

////////////////////////////////////////////////////////////
// POST | EMPLOYEE
////////////////////////////////////////////////////////////

async function addEmployee(first_name, last_name, role) {
  const rolesData = await Role.findAll({
    // to only pull the raw results
    raw: true,
    // pull only the data where the title matches the role
    where: { title: role },
    attributes: {
      // columns to exclude from query
      exclude: ['title', 'salary', 'department_id'],
    },
    // to include data from the associated model = employee
    include: [
      {
        model: Employee,
        // to pull specific attributes
        attributes: ['manager_id'],
      },
    ],
  });
  const role_id = rolesData[0].role_id;
  // Used object value as the second element was in quotations and could not access
  const manager_id = Object.values(rolesData[0])[1];
  const createEmployee = await Employee.create({ first_name, last_name, role_id, manager_id }).then((data) => data.get({ raw: true }));
  await timeoutMessage('Employee');
  console.table([createEmployee]);
}

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
