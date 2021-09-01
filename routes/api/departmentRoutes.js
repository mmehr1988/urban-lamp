const router = require('express').Router();
const Department = require('../../models/Department');
const Role = require('../../models/Role');
const Employee = require('../../models/Employee');

// GET all department
router.get('/', async (req, res) => {
  // Get all department from the department table
  try {
    const departmentData = await Department.findAll({
      include: [{ model: Role }],
    });
    return res.json(departmentData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// // GET one department
router.get('/:id', async (req, res) => {
  // Get one department from the department table based on id
  const id = req.params.id;
  try {
    const department = await Department.findOne(
      { where: { id } },
      {
        include: [{ model: Role }],
      }
    );
    return res.json(department);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// // POST one department
router.post('/', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    // Calls the Post method on the department model
    const createDepartment = await Department.create({ name });

    // Creates a department based on the autoIncremenet in Models
    createDepartment.id = id;

    await createDepartment.save();

    return res.json(createDepartment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Updates department based on its id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  // Calls the update method on the Department model
  try {
    const updateDepartment = await Department.findOne({ where: { id } });

    updateDepartment.name = name;

    await updateDepartment.save();

    return res.json(updateDepartment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete route for a department with a matching id
router.delete('/:id', async (req, res) => {
  // Looks for the department based id given in the request parameters
  const id = req.params.id;
  try {
    const deleteDepartment = await Department.destroy({ where: { id } });
    return res.json(deleteDepartment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
