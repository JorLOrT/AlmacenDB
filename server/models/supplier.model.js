const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: { type: String, required: true },
  contact: {
    phone: { type: String },
    email: { type: String },
  },
  // Campos adicionales para compatibilidad con tus datos de ejemplo
  razonSocial: { type: String },
  ruc: { type: String },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String },
}, {
  timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
