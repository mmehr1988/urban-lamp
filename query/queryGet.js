'use strict';

const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Role = require('../models/Role');

async function directGetAll(url) {
  if (url === 'department') {
    const departments = await Department.findAll({ raw: true });
    return departments;
  } else if (url === 'role') {
    const role = await Role.findAll({ raw: true });
    return role;
  } else if (url === 'employee') {
    const employee = await Employee.findAll({ raw: true });
    return employee;
  } else {
    console.log('Something went wrong');
  }
}

exports.directGetAll = directGetAll;
