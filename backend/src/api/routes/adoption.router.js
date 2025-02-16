const express = require('express');
const {
  getAllAdoption,
  registerAdoption,
  updateAdoption
} = require('../controllers/adoption.controller');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/role');

const adoptionRouter = express.Router();

adoptionRouter.get('/', [isAuth, isAdmin], getAllAdoption);
adoptionRouter.post('/registerAdoption', isAuth, registerAdoption);
adoptionRouter.put('/editAdoption', [isAuth, isAdmin], updateAdoption);
//router.delete('/deleteAdoption', [isAuth, isAdmin], deleteAdoption);

module.exports = adoptionRouter;
