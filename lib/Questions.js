'use strict';
const { Department, Role, Employee } = require('../models');
const chalk = require('chalk');

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
      choices: ['Add Department', 'Add Employee', 'Add Role', 'Delete Department', 'Delete Employee', 'Delete Role', 'View All Departments', 'View All Employees', 'View All Managers', 'View All Roles', 'Update Employee Role', 'Combined Salaries For Department', 'Get Employee By Manager', 'Get Employee By Department'],
    },
  ],
  addDepartment: [
    {
      type: 'input',
      name: 'nameDepartment',
      message: chalk.yellow('Enter') + chalk.red(` department `) + chalk.green('name?'),
    },
  ],
  addRole: [
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter role title?',
      message: chalk.yellow('Enter') + chalk.red(` role `) + chalk.green('title?'),
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: chalk.yellow('Enter') + chalk.red(` role `) + chalk.green('salary?'),
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message: chalk.yellow('Choose') + chalk.red(` department? `),
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
      message: chalk.yellow('Enter') + chalk.red(` employee `) + chalk.green('first name?'),
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: chalk.yellow('Enter') + chalk.red(` employee `) + chalk.green('last name?'),
    },
    {
      type: 'list',
      name: 'employeeRole',
      message: chalk.yellow('Choose') + chalk.red(` Role? `),
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
      message: chalk.yellow('Choose') + chalk.red(` from `) + chalk.green('list?'),
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
      message: chalk.yellow('Choose') + chalk.red(` from `) + chalk.green('list?'),
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
      message: chalk.yellow('Choose') + chalk.red(` from `) + chalk.green('list?'),
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
      message: chalk.yellow('Choose') + chalk.red(` from `) + chalk.green('list?'),
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
      message: chalk.yellow('Choose') + chalk.red(` new `) + chalk.green('role?'),
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
      message: chalk.yellow('Choose') + chalk.red(` department? `),
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
      message: chalk.yellow('Choose') + chalk.red(` manager? `),
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
      message: chalk.yellow('Choose') + chalk.red(` department? `),
      choices: async function dataQuery() {
        const dataChoices = await Department.findAll();
        return dataChoices.map((value) => value.name);
      },
    },
  ],
};

exports.masterQuestions = masterQuestions;
exports.confirmNextQuery = confirmNextQuery;
