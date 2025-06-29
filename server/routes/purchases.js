const router = require('express').Router();
let Purchase = require('../models/purchase.model');
let Store = require('../models/store.model');

router.route('/').get((req, res) => {
  Purchase.find().populate('supplier').populate('store').populate('products.product')
    .then(purchases => res.json(purchases))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const { supplier, store, products, totalCost } = req.body;

  const newPurchase = new Purchase({
    supplier,
    store,
    products,
    totalCost,
  });

  try {
    await newPurchase.save();

    const storeToUpdate = await Store.findById(store);

    for (const item of products) {
      const productIndex = storeToUpdate.inventory.findIndex(p => p.product.toString() === item.product);

      if (productIndex > -1) {
        storeToUpdate.inventory[productIndex].quantity += item.quantity;
      } else {
        storeToUpdate.inventory.push({ product: item.product, quantity: item.quantity });
      }
    }

    await storeToUpdate.save();

    res.json('Purchase added and inventory updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
