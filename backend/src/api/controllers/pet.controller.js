const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    chip: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    sexo: {
      type: String,
      required: true,
      enum: ['Macho', 'Hembra']
    },
    imageUrl: {
      type: String,
      required: true
    },
    tamaño: {
      type: String,
      required: true,
      enum: ['Grande', 'Mediano', 'Pequeño']
    }
  },
  {
    timestamps: true,
    collection: 'pets'
  }
);

const Pet = mongoose.model('pets', petSchema, 'pets');

module.exports = Pet;
