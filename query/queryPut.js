'use strict';

const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Role = require('../models/Role');

async function apiPutRole(employeeId, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
  try {
    const updateEmployee = await Employee.findOne({ where: { id: employeeId } });

    updateEmployee.first_name = employeeFirstName;
    updateEmployee.last_name = employeeLastName;
    updateEmployee.role_id = employeeRoleId;
    updateEmployee.manager_id = employeeManagerId;

    const saveUpdateEmployee = await updateEmployee.save().then((data) => data.get({ raw: true }));

    return saveUpdateEmployee;
  } catch (error) {
    console.log(error);
  }
}

exports.apiPutRole = apiPutRole;
