require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

const productsRouter = require('./routes/products');
const storesRouter = require('./routes/stores');
const suppliersRouter = require('./routes/suppliers');
const customersRouter = require('./routes/customers');
const purchasesRouter = require('./routes/purchases');
const salesRouter = require('./routes/sales');

app.use('/products', productsRouter);
app.use('/stores', storesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/customers', customersRouter);
app.use('/purchases', purchasesRouter);
app.use('/sales', salesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
