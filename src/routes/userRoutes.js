const router = require('express').Router();
const uc     = require('../controllers/userController');

router
  .get('/users', uc.getUsers)
  .get('/users/:userId', uc.getUserById)
  .post('/users', uc.createUser)
  .put('/users/:userId', uc.updateUser)
  .delete('/users/:userId', uc.deleteUser);

module.exports = router;
