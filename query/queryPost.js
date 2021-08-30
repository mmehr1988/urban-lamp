const axios = require('axios');

const apiPostDepartment = {
  async postDataDepartment(url, depName) {
    try {
      let response = await axios.post(`http://localhost:3000/api/${url}`, { name: depName });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

const apiPostRole = {
  async postDataRole(url, roleTitle, roleSalary, roleDepId) {
    try {
      let response = await axios.post(`http://localhost:3000/api/${url}`, { title: roleTitle, salary: roleSalary, department_id: roleDepId });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

const apiPostEmployee = {
  async postDataEmployee(url, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
    try {
      let response = await axios.post(`http://localhost:3000/api/${url}`, { first_name: employeeFirstName, last_name: employeeLastName, role_id: employeeRoleId, manager_id: employeeManagerId });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

exports.apiPostDepartment = apiPostDepartment;
exports.apiPostRole = apiPostRole;
exports.apiPostEmployee = apiPostEmployee;
