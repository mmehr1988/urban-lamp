'use strict';
const inquirer = require('inquirer');
const { masterQuestions, confirmNextQuery } = require('./Questions.js');
// File Path To For All The View Queries
const { viewCompanySpecific } = require('./View.js');
const { addDepartment, addRole, addEmployee } = require('./Add.js');
const { deleteEmployee, deleteDepartment, deleteRole } = require('./Delete.js');
const { updateEmployeeRole } = require('./Update.js');
const { byEmployeeDepartment, byEmployeeManager, bySalaryDepartment } = require('./Other.js');

////////////////////////////////////////////////////////////
// PROMPTS REQUEST CONFIRMATION
////////////////////////////////////////////////////////////

// MANUALLY PROMISIFYING THE NEXTQUERY ASYNC FUNCTION
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function nextQuery() {
  await timeout(1000);
  const confirmNext = await inquirer.prompt(confirmNextQuery.userConfirm);

  switch (confirmNext.finalRequest) {
    case 'Yes':
      confirmQuery();
      break;
    default:
      console.log('See you next time!');
  }
}

////////////////////////////////////////////////////////////
// PROMPTS CONTROLLER
////////////////////////////////////////////////////////////

async function confirmQuery() {
  const confirmNext = await inquirer.prompt(masterQuestions.databaseQuery);

  switch (confirmNext.queryRequest) {
    case 'View All Departments':
      await viewCompanySpecific('department');
      await nextQuery();
      break;
    case 'View All Roles':
      await viewCompanySpecific('role');
      await nextQuery();
      break;
    case 'View All Employees':
      await viewCompanySpecific('employee');
      await nextQuery();
      break;
    case 'View All Managers':
      await viewCompanySpecific('manager');
      await nextQuery();
      break;
    case 'Add Department':
      const nDepartment = await inquirer.prompt(masterQuestions.addDepartment);
      await addDepartment(nDepartment.nameDepartment);
      await nextQuery();
      break;
    case 'Add Role':
      const nRole = await inquirer.prompt(masterQuestions.addRole);
      await addRole(nRole.roleTitle, nRole.roleSalary, nRole.roleDepartment);
      await nextQuery();
      break;
    case 'Add Employee':
      const nEmployee = await inquirer.prompt(masterQuestions.addEmployee);
      await addEmployee(nEmployee.employeeFirstName, nEmployee.employeeLastName, nEmployee.employeeRole);
      await nextQuery();
      break;
    case 'Delete Employee':
      const dEmployee = await inquirer.prompt(masterQuestions.deleteEmployee);
      await deleteEmployee(dEmployee.employeeDelete);
      await nextQuery();
      break;
    case 'Delete Department':
      const dDepartment = await inquirer.prompt(masterQuestions.deleteDepartment);
      await deleteDepartment(dDepartment.departmentDelete);
      await nextQuery();
      break;
    case 'Delete Role':
      const dRole = await inquirer.prompt(masterQuestions.deleteRole);
      await deleteRole(dRole.roleDelete);
      await nextQuery();
      break;
    case 'Update Employee Role':
      const uEmployeeRole = await inquirer.prompt(masterQuestions.updateEmployeeRole);
      await updateEmployeeRole(uEmployeeRole.employeeUpdateName, uEmployeeRole.employeeNewRole);
      await nextQuery();
      break;
    case 'Get Employee By Department':
      const qEmployeeDepartment = await inquirer.prompt(masterQuestions.byEmployeeDepartment);
      await byEmployeeDepartment(qEmployeeDepartment.byDepartmentName);
      await nextQuery();
      break;
    case 'Get Employee By Manager':
      const qEmployeeManager = await inquirer.prompt(masterQuestions.byEmployeeManager);
      await byEmployeeManager(qEmployeeManager.byManagerName);
      await nextQuery();
      break;
    case 'Combined Salaries For Department':
      const qSalaryDepartment = await inquirer.prompt(masterQuestions.bySalaryDepartment);
      await bySalaryDepartment(qSalaryDepartment.bySalaryDepartment);
      await nextQuery();
      break;
    default:
      console.log('Something went wrong.');
  }
}

exports.confirmQuery = confirmQuery;
