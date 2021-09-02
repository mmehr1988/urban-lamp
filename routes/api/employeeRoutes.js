const router = require('express').Router();
const { Employee } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
  // Get all employees from the employee table
  try {
    const employeeData = await Employee.findAll();
    return res.json(employeeData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// // GET one employees
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Get one employee from the employee table based on id
    const employee = await Employee.findOne({ where: { id } });
    return res.json(employee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// // POST one employee
router.post('/', async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, role_id, manager_id } = req.body;
  try {
    // Calls the Post method on the Employee model
    const createEmployee = await Employee.create({ first_name, last_name, role_id, manager_id });

    createEmployee.id = id;

    await createEmployee.save();

    return res.json(createEmployee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Updates employee based on its id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, role_id, manager_id } = req.body;

  // Calls the findOne method on the Employee model
  try {
    const updateEmployee = await Employee.findOne({ where: { id } });

    updateEmployee.first_name = first_name;
    updateEmployee.last_name = last_name;
    updateEmployee.role_id = role_id;
    updateEmployee.manager_id = manager_id;

    await updateEmployee.save();

    return res.json(updateEmployee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete route for a employee with a matching id
router.delete('/:id', async (req, res) => {
  // Looks for the employee based id given in the request parameters
  const id = req.params.id;
  try {
    const deletedEmployee = await Employee.destroy({ where: { id } });
    return res.json(deletedEmployee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
