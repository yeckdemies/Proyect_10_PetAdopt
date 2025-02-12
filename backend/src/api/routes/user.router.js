const express = require('express');
const {
  getAllUser,
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/role');

const router = express.Router();

router.get('/', [isAuth, isAdmin], getAllUser);
router.get('/me', isAuth, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/editUser', [isAuth], updateUser);
router.put('/deleteUser', isAuth, deleteUser);

module.exports = router;
