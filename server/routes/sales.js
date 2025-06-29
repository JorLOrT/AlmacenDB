const router = require('express').Router();
let Sale = require('../models/sale.model');
let Store = require('../models/store.model');

router.route('/').get((req, res) => {
  Sale.find().populate('customer').populate('store').populate('products.product')
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const { customer, store, products, totalPrice } = req.body;

  const newSale = new Sale({
    customer,
    store,
    products,
    totalPrice,
  });

  try {
    await newSale.save();

    const storeToUpdate = await Store.findById(store);

    for (const item of products) {
      const productIndex = storeToUpdate.inventory.findIndex(p => p.product.toString() === item.product);

      if (productIndex > -1) {
        storeToUpdate.inventory[productIndex].quantity -= item.quantity;
      } else {
        // This case should ideally not happen in a real-world scenario
        // as you can't sell a product that is not in the inventory.
        // However, to prevent crashes, we can handle it gracefully.
        console.error(`Product with ID ${item.product} not found in store ${storeToUpdate.name}`);
      }
    }

    await storeToUpdate.save();

    res.json('Sale added and inventory updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
