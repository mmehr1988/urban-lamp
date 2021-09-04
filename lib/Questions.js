'use strict';
const { Department, Role, Employee } = require('../models');

const confirmNextQuery = {
  userConfirm: [
    {
      type: 'list',
      name: 'finalRequest',
      message: 'Would you like to perform another query?',
      choices: ['Yes', 'No'],
    },
  ],
};

// MASTER QUESTIONS PROMPTS ------------------------------
const masterQuestions = {
  databaseQuery: [
    {
      type: 'list',
      name: 'queryRequest',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Delete Department', 'Delete Role', 'Delete Employee', 'Get Employee By Manager', 'Get Employee By Department', 'Combined Salaries For Department'],
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
        const dataChoices = await Department.findAll();
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
        const dataChoices = await Role.findAll();
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
        const dataChoices = await Employee.findAll({
          raw: true,
          attributes: {
            include: ['first_name', 'last_name'],
          },
          order: [['last_name']],
        });

        return [...new Set(dataChoices.map((data) => `${data.last_name}, ${data.first_name}`))];
      },
    },
  ],
  deleteDepartment: [
    {
      type: 'list',
      name: 'departmentDelete',
      message: 'Choose From List?',
      choices: async function dataQuery() {
        const dataChoices = await Department.findAll();
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
        const dataChoices = await Role.findAll();
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
        const dataChoices = await Employee.findAll({
          raw: true,
          attributes: {
            include: ['first_name', 'last_name'],
          },
          order: [['last_name']],
        });

        return [...new Set(dataChoices.map((data) => `${data.last_name}, ${data.first_name}`))];
      },
    },
    {
      type: 'list',
      name: 'employeeNewRole',
      message: 'What Is The New Role?',
      choices: async function dataQuery() {
        const dataChoices = await Role.findAll();
        return dataChoices.map((value) => value.title);
      },
    },
  ],
  byEmployeeDepartment: [
    {
      type: 'list',
      name: 'byDepartmentName',
      message: 'Choose Which Department?',
      choices: async function dataQuery() {
        const dataChoices = await Department.findAll();
        return dataChoices.map((value) => value.name);
      },
    },
  ],
  byEmployeeManager: [
    {
      type: 'list',
      name: 'byManagerName',
      message: 'Choose Which Manager?',
      choices: async function dataQuery() {
        const dataChoices = await Employee.findAll({
          raw: true,
          attributes: {
            include: ['first_name', 'last_name'],
          },
          order: [['last_name']],
        });
        let managerNames = [];
        dataChoices.forEach(function (v, i, r) {
          if (v.manager_id === null) {
            managerNames.push(`${v.last_name}, ${v.first_name}`);
          }
        });
        return managerNames;
      },
    },
  ],
  bySalaryDepartment: [
    {
      type: 'list',
      name: 'bySalaryDepartment',
      message: 'Choose Which Department?',
      choices: async function dataQuery() {
        const dataChoices = await Department.findAll();
        return dataChoices.map((value) => value.name);
      },
    },
  ],
};

exports.masterQuestions = masterQuestions;
exports.confirmNextQuery = confirmNextQuery;
