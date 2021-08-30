const sequelize = require('../config/connection');

const Department = require('../models/Department');
const Role = require('../models/Role');
const Employee = require('../models/Employee');

const departmentSeedData = require('./departmentSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true,
  });

  await Department.bulkCreate(departmentSeedData);
  await Role.bulkCreate(roleSeedData);
  await Employee.bulkCreate(employeeSeedData);

  console.log('success');
  process.exit(0);
};

seedDatabase();
