'use strict';

const { Role, Employee } = require('../models');
require('console.table');

////////////////////////////////////////////////////////////
// MANUAL PROMISE TIMEOUT
////////////////////////////////////////////////////////////

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

////////////////////////////////////////////////////////////
// UPDATE | EMPLOYEE ROLE
////////////////////////////////////////////////////////////

async function updateEmployeeRole(fullName, newRole) {
  const empNameSplit = fullName.split(', ');
  const first_name = empNameSplit[1];
  const last_name = empNameSplit[0];

  const roleData = await Role.findAll({
    // to only pull the raw results
    raw: true,
    where: { title: newRole },
    attributes: {
      // columns to exclude from query
      exclude: ['title', 'salary', 'department_id'],
    },
    include: [
      {
        model: Employee,
        // to pull specific attributes
        attributes: ['manager_id'],
      },
    ],
  });

  const updateEmployee = await Employee.findOne({ where: { first_name, last_name } });
  updateEmployee.role_id = roleData[0].id;
  updateEmployee.manager_id = Object.values(roleData[0])[1];
  const saveUpdateEmployee = await updateEmployee.save().then((data) => data.get({ raw: true }));

  console.log(`Updating Employee: ${fullName}`);
  await timeout(2000);
  console.log('Successfully Updated!');
  await timeout(1000);
  console.table([saveUpdateEmployee]);
}

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////
exports.updateEmployeeRole = updateEmployeeRole;
