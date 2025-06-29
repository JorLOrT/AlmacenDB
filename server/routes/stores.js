const router = require('express').Router();
let Store = require('../models/store.model');

router.route('/').get((req, res) => {
  Store.find().populate('inventory.product')
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { name, location } = req.body;

  const newStore = new Store({
    name,
    location,
  });

  newStore.save()
    .then(() => res.json('Store added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
