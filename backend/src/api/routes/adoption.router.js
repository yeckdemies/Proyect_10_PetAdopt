const express = require('express');
const {
  getAllAdoption,
  registerAdoption,
  updateAdoption,
  deleteAdoption
} = require('../controllers/pet.controller');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/role');

const routerAdoption = express.Router();

router.get('/', [isAuth, isAdmin], getAllAdoption);
router.post('/registerAdoption', isAuth, registerAdoption);
router.put('/editAdoption', [isAuth, isAdmin], updateAdoption);
router.delete('/deleteAdoption', [isAuth, isAdmin], deleteAdoption);

module.exports = routerAdoption;
