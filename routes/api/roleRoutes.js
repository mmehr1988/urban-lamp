const router = require('express').Router();
const Role = require('../../models/Role');

// GET all role
router.get('/', async (req, res) => {
  // Get all role from the role table
  try {
    const roleData = await Role.findAll();
    return res.json(roleData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET one role
router.get('/:id', async (req, res) => {
  // Get one role from the role table based on id
  const id = req.params.id;
  try {
    const role = await Role.findOne({ where: { id } });
    return res.json(role);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// // POST one role
router.post('/', async (req, res) => {
  const id = req.params.id;
  const { title, salary, department_id } = req.body;

  try {
    // Calls the Post method on the Role model
    const createRole = await Role.create({ title, salary, department_id });

    createRole.id = id;

    await createRole.save();

    return res.json(createRole);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Updates role based on its id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, salary, department_id } = req.body;

  try {
    // Calls the findOne method on the Role model
    const updateRole = await Role.findOne({ where: { id } });

    updateRole.title = title;
    updateRole.salary = salary;
    updateRole.department_id = department_id;

    await updateRole.save();

    return res.json(updateRole);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete route for a role with a matching id
// BUG when you delete, the id needs to be deleted as it skips currently when you create a new role
router.delete('/:id', async (req, res) => {
  // Looks for the role based id given in the request parameters
  const id = req.params.id;
  try {
    const deleteRole = await Role.destroy({ where: { id } });
    return res.json(deleteRole);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
