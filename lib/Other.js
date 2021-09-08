'use strict';
const { timeoutMessage } = require('./Helper.js');
const { Department, Role, Employee } = require('../models');
require('console.table');

////////////////////////////////////////////////////////////
// PROMPTS: EMPLOYEE BY DEPARTMENT
////////////////////////////////////////////////////////////

async function byEmployeeDepartment(name) {
  const department = await Department.findAll({
    raw: true,
    where: { name },
  });

  const depId = department[0].id;

  const employee = await Employee.findAll({
    // to only pull the raw results
    raw: true,
    // pull only the data where the title matches the role
    include: [
      {
        model: Role,
        where: { department_id: depId },
      },
    ],
  });

  let departmentEmployees = [];
  employee.forEach(async (v, i, r) => {
    const id = employee[i].id;
    const first_name = employee[i].first_name;
    const last_name = employee[i].last_name;
    const role_id = employee[i].role_id;
    const manager_id = employee[i].manager_id;

    departmentEmployees.push({
      id: id,
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    });
  });

  await timeoutMessage('Retrieving Employees By Department');
  console.table(departmentEmployees);
}

////////////////////////////////////////////////////////////
// PROMPTS: EMPLOYEE BY MANAGER
////////////////////////////////////////////////////////////

async function byEmployeeManager(fullName) {
  const empNameSplit = fullName.split(', ');
  const first_name = empNameSplit[1];
  const last_name = empNameSplit[0];

  const managerId = await Employee.findAll({
    raw: true,
    where: { first_name, last_name },
  });

  const manager_id = await managerId[0].id;
  const employeeAll = await Employee.findAll({ raw: true, where: { manager_id } });

  let managerEmployees = [];
  employeeAll.forEach(async (v, i, r) => {
    const id = employeeAll[i].id;
    const first_name = employeeAll[i].first_name;
    const last_name = employeeAll[i].last_name;
    const role_id = employeeAll[i].role_id;
    const manager_id = employeeAll[i].manager_id;

    managerEmployees.push({
      id: id,
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    });
  });
  managerEmployees.unshift(...managerId);
  await timeoutMessage('Retrieving Employees By Manager');
  console.table(managerEmployees);
}

////////////////////////////////////////////////////////////
// PROMPTS: COMBINED SALARIES FOR EACH DEPARTMENT
////////////////////////////////////////////////////////////

async function bySalaryDepartment(name) {
  const department = await Department.findAll({
    raw: true,
    where: { name },
  });

  const depId = department[0].id;

  const employee = await Employee.findAll({
    // to only pull the raw results
    raw: true,
    // pull only the data where the title matches the role
    include: [
      {
        model: Role,
        where: { department_id: depId },
      },
    ],
  });

  let salaryEmployees = 0;
  employee.forEach(async (v, i, r) => {
    const salary = Number(Object.values(employee[i])[7]);

    salaryEmployees = salaryEmployees + salary;
  });

  let tableOutput = [];
  tableOutput.push({
    Id: depId,
    Department: name,
    Total: salaryEmployees,
  });
  await timeoutMessage(`Retrieving Salaries By Department: ${name}`);
  console.table(tableOutput);
}

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////
exports.byEmployeeDepartment = byEmployeeDepartment;
exports.byEmployeeManager = byEmployeeManager;
exports.bySalaryDepartment = bySalaryDepartment;
