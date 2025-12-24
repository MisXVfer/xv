const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  numeroPersonas: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  confirmado: {
    type: Boolean,
    default: false
  },
  fechaConfirmacion: {
    type: Date
  },
  telefono: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  mesa: {
    type: String,
    trim: true
  },
  notas: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Guest', guestSchema);
