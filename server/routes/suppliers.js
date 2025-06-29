const router = require('express').Router();
let Supplier = require('../models/supplier.model');

router.route('/').get((req, res) => {
  Supplier.find()
    .then(suppliers => res.json(suppliers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { name, contact } = req.body;

  const newSupplier = new Supplier({
    name,
    contact,
  });

  newSupplier.save()
    .then(() => res.json('Supplier added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
