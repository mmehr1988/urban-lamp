'use strict';

const { dataQueryGetAll } = require('../query/queryMaster.js');

// MASTER QUESTIONS PROMPTS ------------------------------
const masterQuestions = {
  databaseQuery: [
    {
      type: 'list',
      name: 'queryRequest',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Delete Department', 'Delete Role', 'Delete Employee', 'Get Employee By Manager', 'Get Employee By Department'],
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
        const dataChoices = await dataQueryGetAll('department');
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
        const dataChoices = await dataQueryGetAll('role');
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
        const dataChoices = await dataQueryGetAll('employee');
        return [...new Set(dataChoices.map((data) => `${[data.first_name, data.last_name].join(' ')}`))];
      },
    },
    {
      type: 'list',
      name: 'employeeNewRole',
      message: 'What Is The New Role?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGetAll('role');
        return dataChoices.map((value) => value.title);
      },
    },
  ],
  deleteEmployee: [
    {
      type: 'list',
      name: 'employeeDelete',
      message: 'Choose From List?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGetAll('employee');
        return [...new Set(dataChoices.map((data) => `${[data.first_name, data.last_name].join(' ')}`))];
      },
    },
  ],
  deleteDepartment: [
    {
      type: 'list',
      name: 'departmentDelete',
      message: 'Choose From List?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGetAll('department');
        return dataChoices.map((value) => value.name);
      },
    },
  ],
  deleteRole: [
    {
      type: 'list',
      name: 'roleDelete',
      message: 'Choose From List?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGetAll('role');
        return dataChoices.map((value) => value.title);
      },
    },
  ],
  byEmployeeManager: [
    {
      type: 'list',
      name: 'byManagerName',
      message: 'Choose Which Manager?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGetAll('employee');
        let managerNames = [];
        dataChoices.forEach(function (v, i, r) {
          if (v.manager_id === null) {
            managerNames.push(`${v.first_name} ${v.last_name}`);
          }
        });
        return managerNames;
      },
    },
  ],
  byEmployeeDepartment: [
    {
      type: 'list',
      name: 'byDepartmentName',
      message: 'Choose Which Department?',
      choices: async function dataQuery() {
        const dataChoices = await dataQueryGetAll('department');
        return dataChoices;
      },
    },
  ],
};

exports.masterQuestions = masterQuestions;
