'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const { Department, Role, Employee } = require('../models');
require('console.table');

const { getDepartmentRoleEmployee, timeoutMessage } = require('./Helper.js');

////////////////////////////////////////////////////////////
// POST | DEPARTMENT
////////////////////////////////////////////////////////////

async function addDepartment(name) {
  const createDepartment = await Department.create({ name }).then((data) => data.get({ raw: true }));
  await timeoutMessage(`Building Department: ${name}`);
  console.table([createDepartment]);
}

////////////////////////////////////////////////////////////
// POST | ROLE
////////////////////////////////////////////////////////////

async function addRole(title, salary, name) {
  const dataChoices = await Department.findAll({ raw: true, where: { name } });
  const department_id = dataChoices[0].id;
  const postRole = await Role.create({ title, salary, department_id }).then((data) => data.get({ raw: true }));
  await timeoutMessage(`Building Role: ${name}`);
  console.table([postRole]);
}

////////////////////////////////////////////////////////////
// POST | EMPLOYEE
////////////////////////////////////////////////////////////

async function addEmployee(first_name, last_name, role) {
  ///////////////////////////////////////////////////////////////////////////////
  // [1] Find Department ID based on Role
  const getRoleInfo = await getDepartmentRoleEmployee('', { title: role }, '');
  const department_id = getRoleInfo[0].department_id;
  const role_id = getRoleInfo[0].role_id;
  ///////////////////////////////////////////////////////////////////////////////
  // [2] Find Managers Based On Department ID
  const getData = await getDepartmentRoleEmployee('', '', '');

  let filteredPeople = getData.filter(function (currentElement) {
    // the current value is an object, so you can check on its properties
    return currentElement.employee_Manager_ID === null && currentElement.employee_First_Name !== null && currentElement.department_id === department_id;
  });
  ///////////////////////////////////////////////////////////////////////////////
  // [3] Prompt for manager choice incase there are more than 1 manager per department
  const confirmManager = await inquirer.prompt([
    {
      type: 'list',
      name: 'managerConfirm',
      message: chalk.yellow('Choose') + chalk.red(` manager? `),
      choices: async function dataQuery() {
        // [4] Include ID has there might be more than one manager with the same name
        const managerNames = await [...new Set(filteredPeople.map((data) => `${data.employee_Last_Name}, ${data.employee_First_Name} [id: ${data.employee_id}]`))];
        return managerNames;
      },
    },
  ]);

  // [5] Regex to extract only numbers from a string
  var manager_id = confirmManager.managerConfirm.replace(/\D/g, '');

  const createEmployee = await Employee.create({ first_name, last_name, role_id, manager_id }).then((data) => data.get({ raw: true }));
  await timeoutMessage(`Building Employee: ${last_name}, ${first_name}`);
  console.table([createEmployee]);
}

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
