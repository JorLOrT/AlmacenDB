const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      cost: { type: Number, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
}, {
  timestamps: true,
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
