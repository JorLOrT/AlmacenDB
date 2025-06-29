const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
}, {
  timestamps: true,
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
