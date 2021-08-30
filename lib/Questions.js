'use strict';

const { dataQueryGet, dataQueryPostDepartment, dataQueryPostRole } = require('../query/queryMaster.js');

// QUESTIONS --------------------------------------------
// View All Employees COMPLETE
// Add Employee COMPLETE
// Update Employee Role COMPLETE
// View All Roles COMPLETE
// Add Role COMPLETE
// View All Departments COMPLETE
// Add Department COMPLETE

// MASTER QUESTIONS PROMPTS ------------------------------
const masterQuestions = {
  databaseQuery: [
    {
      type: 'list',
      name: 'queryRequest',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
    },
  ],
  addDepartment: [
    {
      type: 'input',
      name: 'nameDepartment',
      message: 'Enter department name?',
    },
  ],
  addRole: [
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter role title?',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter role salary?',
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message: 'What department?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGet('department');
        return dataChoices.map((value) => value.name);
      },
    },
  ],
  addEmployee: [
    {
      type: 'input',
      name: 'employeeFirstName',
      message: 'Enter employee first name?',
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'Enter employee last name?',
    },
    {
      type: 'list',
      name: 'employeeRole',
      message: 'What Role?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGet('role');
        return dataChoices.map((value) => value.title);
      },
    },
  ],
  updateEmployeeRole: [
    {
      type: 'list',
      name: 'employeeUpdateName',
      message: 'Choose From List?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGet('employee');
        return [...new Set(dataChoices.map((data) => `${[data.first_name, data.last_name].join(' ')}`))];
      },
    },
    {
      type: 'list',
      name: 'employeeNewRole',
      message: 'What Is The New Role?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGet('role');
        return dataChoices.map((value) => value.title);
      },
    },
  ],
};

exports.masterQuestions = masterQuestions;
