const axios = require('axios');

const apiGet = {
  async getData(url) {
    try {
      let response = await axios.get(`http://localhost:3000/api/${url}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = apiGet;
