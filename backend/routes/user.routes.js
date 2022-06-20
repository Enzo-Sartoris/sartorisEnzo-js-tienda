const router = require('express').Router();

const { createUser, getUser, deleteUser, getUserById, loginUser } = require('../controllers/users.controllers');

router.get('/', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);

router.post('/login', loginUser);

module.exports = router;