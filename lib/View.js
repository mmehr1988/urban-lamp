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
    const employees = await Employee.findAll({ raw: true });
    await timeout(2000);
    console.log('Successfully Retrieved!');
    console.table(employees);
  } else {
    console.log('Something went wrong');
  }
}

exports.viewCompanySpecific = viewCompanySpecific;
