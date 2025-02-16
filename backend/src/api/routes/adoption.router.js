const express = require('express');
const {
  getAllAdoption,
  registerAdoption,
  updateAdoption,
  deleteAdoption
} = require('../controllers/adoption.controller');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/role');

const adoptionRouter = express.Router();

adoptionRouter.get('/', [isAuth, isAdmin], getAllAdoption);
adoptionRouter.post('/registerAdoption', isAuth, registerAdoption);
adoptionRouter.put('/editAdoption/:adoptionId', [isAuth, isAdmin], updateAdoption);
adoptionRouter.delete('/deleteAdoption/:adoptionId', [isAuth, isAdmin], deleteAdoption);

module.exports = adoptionRouter;
