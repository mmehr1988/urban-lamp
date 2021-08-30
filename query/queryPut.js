const axios = require('axios');

const apiPutRole = {
  async updateEmployeeRole(url, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
    try {
      let response = await axios.put(`http://localhost:3000/api/${url}`, { first_name: employeeFirstName, last_name: employeeLastName, role_id: employeeRoleId, manager_id: employeeManagerId });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

exports.apiPutRole = apiPutRole;
