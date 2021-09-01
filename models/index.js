const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

// Employee.belongsTo(Employee, {
//   foreignKey: 'manager_id',
//   as: 'junior',
// });

// Employee.hasMany(Employee, {
//   foreignKey: 'manager_id',
//   as: 'manager',
// });

// Role.hasMany(Employee, {
//   foreignKey: 'role_id',
// });

// Employee.belongsTo(Role, {
//   foreignKey: 'role_id',
// });

// Role.belongsTo(Department, {
//   foreignKey: 'department_id',
// });

// Department.hasMany(Role, {
//   foreignKey: 'department_id',
// });

// Employee.belongsToMany(Department, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Role,
//     unique: false,
//   },
//   // Define an alias for when data is retrieved
//   as: 'department_employees',
// });

// Department.belongsToMany(Employee, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Role,
//     unique: false,
//   },
//   // Define an alias for when data is retrieved
//   as: 'department_roles',
// });

// Products belongToMany Tags (through ProductTag)
// Department.belongsToMany(Employee, {
//   through: Role,
//   foreignKey: 'role_id',
// });

// Tags belongToMany Products (through ProductTag)
//   Tag.belongsToMany(Product, {
//     through: ProductTag,
//     foreignKey: 'tag_id'
//   });

module.exports = { Department, Role, Employee };
