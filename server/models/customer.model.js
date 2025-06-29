const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['empresa', 'persona natural'], required: true },
  contact: {
    phone: { type: String },
    email: { type: String },
  },
}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
