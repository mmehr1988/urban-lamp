'use strict';
const inquirer = require('inquirer');

const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const cTable = require('console.table');
const app = express();
const PORT = process.env.PORT || 3000;

////////////////////////////////////////////////////////////
// FILE PATH: QUESTIONS
////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TURN ON ROUTES
app.use(routes);

////////////////////////////////////////////////////////////
// File Paths
////////////////////////////////////////////////////////////

const { masterQuestions } = require('./lib/Questions.js');
const { dataQueryGetAll, dataQueryPostDepartment, dataQueryPostRole, dataQueryPostEmployee, dataQueryPutRole } = require('./query/queryMaster.js');

////////////////////////////////////////////////////////////
// PROMPTS: CONFIRM
////////////////////////////////////////////////////////////

async function confirmQuery() {
  const confirmNext = await inquirer.prompt(masterQuestions.databaseQuery);

  switch (confirmNext.queryRequest) {
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'View All Employees':
      await viewEmployees();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    default:
      console.log('Try Again');
  }
}

////////////////////////////////////////////////////////////
// PROMPTS: GET ALL
////////////////////////////////////////////////////////////
// COMPLETE
async function viewDepartments() {
  const getDepartments = await dataQueryGetAll('department');
  console.table(getDepartments);
  await confirmQuery();
}
// COMPLETE
async function viewRoles() {
  const getRoles = await dataQueryGetAll('role');
  console.table(getRoles);
  await confirmQuery();
}
// COMPLETE
async function viewEmployees() {
  const getEmployees = await dataQueryGetAll('employee');
  console.table(getEmployees);
  await confirmQuery();
}

////////////////////////////////////////////////////////////
// PROMPTS: POST
////////////////////////////////////////////////////////////
// COMPLETE
async function addDepartment() {
  const nDepartment = await inquirer.prompt(masterQuestions.addDepartment);
  const postDepartment = await dataQueryPostDepartment(nDepartment.nameDepartment);
  console.table(postDepartment);
  await confirmQuery();
}
// COMPLETE
async function addRole() {
  const nRole = await inquirer.prompt(masterQuestions.addRole);
  const getDepartments = await dataQueryGetAll('department');
  const departmentId = getDepartments.find((array) => array.name === nRole.roleDepartment).id;
  const postRole = await dataQueryPostRole(nRole.roleTitle, nRole.roleSalary, departmentId);
  console.table(postRole);
  await confirmQuery();
}
// COMPLETE
async function addEmployee() {
  const nEmployee = await inquirer.prompt(masterQuestions.addEmployee);
  // Role Id Query based On Role title
  const getRoles = await dataQueryGetAll('role');
  const roleId = await getRoles.find((array) => array.title === nEmployee.employeeRole).id;

  // Manager Id Query based On Existing Employees
  const getEmployees = await dataQueryGetAll('employee');
  const managerId = await getEmployees.find((array) => array.role_id === roleId).manager_id;

  // Create Employee
  const postEmployee = await dataQueryPostEmployee(nEmployee.employeeFirstName, nEmployee.employeeLastName, roleId, managerId);
  console.table(postEmployee);
  await confirmQuery();
}

////////////////////////////////////////////////////////////
// PROMPTS: PUT
////////////////////////////////////////////////////////////

async function updateEmployeeRole() {
  const uEmployeeRole = await inquirer.prompt(masterQuestions.updateEmployeeRole);
  const nameSplit = uEmployeeRole.employeeUpdateName.split(' ');

  // Manager Id Query based On Existing Employees
  const getEmployees = await dataQueryGetAll('employee');

  // To Get Employee Id
  let employeeId = '';
  getEmployees.forEach(function (v, i, r) {
    if (v.first_name === nameSplit[0] && v.last_name === nameSplit[1]) {
      employeeId = v.id;
    } else {
      return 'nothing';
    }
  });

  // To Get Role Id
  const getRoles = await dataQueryGetAll('role');
  const roleId = await getRoles.find((array) => array.title === uEmployeeRole.employeeNewRole).id;

  // Manager Id Query based On Existing Employees
  const findEmployees = await dataQueryGetAll('employee');
  const findManagerId = await findEmployees.find((array) => array.role_id === roleId).manager_id;

  // Update Employee Info
  const putRole = await dataQueryPutRole(employeeId, nameSplit[0], nameSplit[1], roleId, findManagerId);
  console.table(putRole);
  await confirmQuery();
}

////////////////////////////////////////////////////////////
// TURN ON CONNECTION TO DB + SERVER
////////////////////////////////////////////////////////////

async function main() {
  try {
    await sequelize.sync({ force: false });
    await app.listen(PORT);
    await confirmQuery();
    console.log(`Now listening to http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
}
main();
