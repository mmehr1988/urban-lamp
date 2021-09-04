'use strict';

const { Department, Role, Employee } = require('../models');
require('console.table');
////////////////////////////////////////////////////////////
// MANUAL PROMISE TIMEOUT
////////////////////////////////////////////////////////////

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

////////////////////////////////////////////////////////////
// GET ALL | DEPARTMENTS + ROLE + EMPLOYEE
////////////////////////////////////////////////////////////

async function viewCompanySpecific(url) {
  if (url === 'department') {
    const departments = await Department.findAll({ raw: true });
    await timeout(2000);
    console.log('Successfully Retrieved!');
    console.table(departments);
  } else if (url === 'role') {
    const roles = await Role.findAll({ raw: true });
    await timeout(2000);
    console.log('Successfully Retrieved!');
    console.table(roles);
  } else if (url === 'employee') {
    const employees = await Employee.findAll({
      raw: true,
      include: [{ model: Role, attributes: { exclude: ['id', 'department_id'] } }],
    });

    let employeeInfo = [];
    employees.forEach(async (v, i, r) => {
      employeeInfo.push({
        id: employees[i].id,
        first_name: employees[i].first_name,
        last_name: employees[i].last_name,
        manager_id: employees[i].manager_id,
        title: Object.values(employees[i])[5],
        salary: Object.values(employees[i])[6],
      });
    });
    await timeout(2000);
    console.log('Successfully Retrieved!');
    console.table(employeeInfo);
  } else {
    console.log('Something went wrong');
  }
}

exports.viewCompanySpecific = viewCompanySpecific;
