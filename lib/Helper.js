'use strict';
const { Department, Role, Employee } = require('../models');

////////////////////////////////////////////////////////////
// MANUAL PROMISE TIMEOUT
////////////////////////////////////////////////////////////

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function timeoutMessage(message) {
  console.log(`${message}`);
  await timeout(2000);
  console.log('Success!');
}

////////////////////////////////////////////////////////////
// GET ALL THE DATA FROM DEPARTMENT > ROLE > EMPLOYEE
////////////////////////////////////////////////////////////

async function getDepartmentRoleEmployee(whereDepart, whereRole, whereEmployee) {
  const getAllData = await Department.findAll({
    raw: true,
    where: whereDepart,
    include: [
      {
        model: Role,
        where: whereRole,
        include: [
          {
            model: Employee,
            where: whereEmployee,
          },
        ],
      },
    ],
  });

  let returnDepAllObj = [];

  getAllData.forEach(function (v, i, r) {
    const departmentID = Object.values(getAllData[i])[0];
    const departmentNAME = Object.values(getAllData[i])[1];
    const roleID = Object.values(getAllData[i])[2];
    const roleTITLE = Object.values(getAllData[i])[3];
    const roleSALARY = Object.values(getAllData[i])[4];
    const employeeID = Object.values(getAllData[i])[6];
    const employeeFIRST = Object.values(getAllData[i])[7];
    const employeeLAST = Object.values(getAllData[i])[8];
    const employeeROLEID = Object.values(getAllData[i])[9];
    const employeeMANAGERID = Object.values(getAllData[i])[10];

    returnDepAllObj.push({
      department_id: departmentID,
      department_name: departmentNAME,
      role_id: roleID,
      role_title: roleTITLE,
      role_salary: roleSALARY,
      employee_id: employeeID,
      employee_First_Name: employeeFIRST,
      employee_Last_Name: employeeLAST,
      employee_Role_ID: employeeROLEID,
      employee_Manager_ID: employeeMANAGERID,
    });
  });
  return returnDepAllObj;
}

exports.timeoutMessage = timeoutMessage;
exports.getDepartmentRoleEmployee = getDepartmentRoleEmployee;
