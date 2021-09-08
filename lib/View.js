'use strict';
const { getDepartmentRoleEmployee, timeoutMessage } = require('./Helper.js');
const { Department, Role } = require('../models');
require('console.table');

////////////////////////////////////////////////////////////
// GET ALL | DEPARTMENTS + ROLE + EMPLOYEE + MANAGERS
////////////////////////////////////////////////////////////

async function viewCompanySpecific(url) {
  if (url === 'department') {
    ////////////////////////////////////////////////////////////
    // VIEW DEPARTMENTS
    ////////////////////////////////////////////////////////////
    const departments = await Department.findAll({ raw: true });
    await timeoutMessage(`Retrieving Department Table`);
    console.table(departments);
    ////////////////////////////////////////////////////////////
  } else if (url === 'role') {
    ////////////////////////////////////////////////////////////
    // VIEW ROLES
    ////////////////////////////////////////////////////////////
    const getData = await getDepartmentRoleEmployee('', '', '');

    let returnAllObj = [];
    // Creating Unique Object based
    getData.forEach(function (v, i, r) {
      returnAllObj.push({
        id: getData[i].role_id,
        Title: getData[i].role_title,
        Salary: getData[i].role_salary,
        Department: getData[i].department_name,
      });
    });

    // Filtering for unique objects
    var filteredRoles = returnAllObj.filter(function (rec) {
      var key = rec.id + '|' + rec.Title + '|' + rec.Salary + '|' + rec.Department;
      if (!this[key]) {
        this[key] = true;
        return true;
      }
    }, Object.create(null));

    // Sort final table based on department Name
    filteredRoles.sort((a, b) => a.Department.localeCompare(b.Department));

    await timeoutMessage(`Retrieving Role Table`);
    console.table(filteredRoles);
    ////////////////////////////////////////////////////////////
  } else if (url === 'employee') {
    ////////////////////////////////////////////////////////////
    // VIEW EMPLOYEES
    ////////////////////////////////////////////////////////////
    const getData = await getDepartmentRoleEmployee('', '', '');

    let filteredPeople = getData.filter(function (currentElement) {
      return currentElement.employee_First_Name !== null;
    });

    let returnAllObj = [];

    filteredPeople.forEach(function (v, i, r) {
      returnAllObj.push({
        id: filteredPeople[i].employee_id,
        Last_Name: `${filteredPeople[i].employee_Last_Name}`,
        First_Name: `${filteredPeople[i].employee_First_Name} `,
        Manager_id: filteredPeople[i].employee_Manager_ID,
        Salary: filteredPeople[i].role_salary,
        Title: filteredPeople[i].role_title,
        Department: filteredPeople[i].department_name,
      });
    });

    // Sort final table based on last name
    returnAllObj.sort((a, b) => a.Last_Name.localeCompare(b.Last_Name));
    await timeoutMessage(`Retrieving Employee Table`);
    console.table(returnAllObj);
    ////////////////////////////////////////////////////////////
  } else if (url === 'manager') {
    ////////////////////////////////////////////////////////////
    // VIEW EMPLOYEES
    ////////////////////////////////////////////////////////////
    const getData = await getDepartmentRoleEmployee('', '', '');

    let filteredPeople = getData.filter(function (currentElement) {
      return currentElement.employee_Manager_ID === null && currentElement.employee_First_Name !== null;
    });

    let returnAllObj = [];
    filteredPeople.forEach(function (v, i, r) {
      returnAllObj.push({
        id: filteredPeople[i].employee_id,
        Last_Name: `${filteredPeople[i].employee_Last_Name}`,
        First_Name: `${filteredPeople[i].employee_First_Name} `,
        Salary: filteredPeople[i].role_salary,
        Title: filteredPeople[i].role_title,
        Department: filteredPeople[i].department_name,
      });
    });

    // Sort final table based on last name
    returnAllObj.sort((a, b) => a.Last_Name.localeCompare(b.Last_Name));
    await timeoutMessage(`Retrieving Manager Table`);
    console.table(returnAllObj);
  } else {
    console.log('Something went wrong');
  }
}

exports.viewCompanySpecific = viewCompanySpecific;
