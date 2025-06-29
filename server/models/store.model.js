const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  nombre: { type: String },
  direccion: { type: String },
  ciudad: { type: String },
  telefono: { type: String },
  inventory: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 0 },
    },
  ],
}, {
  timestamps: true,
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
