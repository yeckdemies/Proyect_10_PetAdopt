const express = require('express');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/role');
const { uploadPet } = require('../../middlewares/upload-file');
const {
  getAllPet,
  registerPet,
  updatePet,
  deletePet
} = require('../controllers/pet.controller');
const petRouter = express.Router();

petRouter.get('/', [isAuth, isAdmin], getAllPet);
petRouter.post(
  '/registerPet',
  [isAuth, isAdmin, uploadPet.single('imageUrl')],
  registerPet
);
petRouter.put(
  '/editPet/:petId',
  [isAuth, isAdmin, uploadPet.single('imageUrl')],
  updatePet
);
petRouter.delete('/deletePet/:petId', [isAuth, isAdmin], deletePet);

module.exports = petRouter;
