import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, Grid, Alert } from '@mui/material';

const CreateSale = ({ onClose }) => {
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [saleProducts, setSaleProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [storeInventory, setStoreInventory] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('/api/customers/')
      .then(response => {
        if (response.data.length > 0) {
          setCustomers(response.data);
          setSelectedCustomer(response.data[0]._id);
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('/api/stores/')
      .then(response => {
        if (response.data.length > 0) {
          setStores(response.data);
          setSelectedStore(response.data[0]._id);
          // Cargar inventario de la primera tienda
          loadStoreInventory(response.data[0]._id);
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const loadStoreInventory = (storeId) => {
    axios.get('/api/stores/')
      .then(response => {
        const store = response.data.find(s => s._id === storeId);
        if (store) {
          setStoreInventory(store.inventory);
        }
      })
      .catch((error) => {
        console.log('Error loading inventory:', error);
      });
  };

  const getAvailableStock = (productId) => {
    const inventoryItem = storeInventory.find(item => item.product._id === productId);
    return inventoryItem ? inventoryItem.quantity : 0;
  };

  const handleAddProduct = () => {
    setSaleProducts([...saleProducts, { product: '', quantity: 0, price: 0 }]);
  };

  const handleStoreChange = (storeId) => {
    setSelectedStore(storeId);
    loadStoreInventory(storeId);
    // Limpiar productos seleccionados al cambiar de tienda
    setSaleProducts([]);
    setTotalPrice(0);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...saleProducts];
    
    if (field === 'quantity') {
      const productId = updatedProducts[index].product;
      const availableStock = getAvailableStock(productId);
      
      if (parseInt(value) > availableStock) {
        alert(`Stock insuficiente. Solo hay ${availableStock} unidades disponibles.`);
        return;
      }
    }
    
    updatedProducts[index][field] = value;
    setSaleProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    setTotalPrice(total);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validar stock antes de enviar
    for (const item of saleProducts) {
      const availableStock = getAvailableStock(item.product);
      if (parseInt(item.quantity) > availableStock) {
        const product = products.find(p => p._id === item.product);
        setError(`Stock insuficiente para ${product?.name}. Solo hay ${availableStock} unidades disponibles.`);
        return;
      }
    }

    const sale = {
      customer: selectedCustomer,
      store: selectedStore,
      products: saleProducts.map(item => ({
        product: item.product,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price)
      })),
      totalPrice
    }

    console.log('Sending sale data:', sale);

    axios.post('/api/sales/add', sale)
      .then(res => {
        console.log('Success:', res.data);
        setSuccess('¡Venta creada exitosamente!');
        
        // Reset form
        setSaleProducts([]);
        setTotalPrice(0);
        setSelectedCustomer(customers.length > 0 ? customers[0]._id : '');
        setSelectedStore(stores.length > 0 ? stores[0]._id : '');
        
        // Close modal after a short delay
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      })
      .catch(error => {
        console.error('Error details:', error);
        setError(`Error al crear la venta: ${error.response?.data?.message || error.message}`);
      });
  }

  return (
    <Box sx={{ p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="customer-label">Cliente</InputLabel>
          <Select
            labelId="customer-label"
            id="customer"
            value={selectedCustomer}
            label="Cliente"
            onChange={e => setSelectedCustomer(e.target.value)}
          >
            { customers.map(customer => (
              <MenuItem key={customer._id} value={customer._id}>
                {customer.name}
              </MenuItem>
            )) }
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="store-label">Tienda</InputLabel>
          <Select
            labelId="store-label"
            id="store"
            value={selectedStore}
            label="Tienda"
            onChange={e => handleStoreChange(e.target.value)}
          >
            { stores.map(store => (
              <MenuItem key={store._id} value={store._id}>
                {store.name} - {store.location}
              </MenuItem>
            )) }
          </Select>
        </FormControl>
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Productos</Typography>
          {saleProducts.map((item, index) => {
            const availableStock = item.product ? getAvailableStock(item.product) : 0;
            const selectedProduct = products.find(p => p._id === item.product);
            
            return (
              <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id={`product-label-${index}`}>Product</InputLabel>
                      <Select
                        labelId={`product-label-${index}`}
                        id={`product-${index}`}
                        value={item.product}
                        label="Producto"
                        onChange={e => handleProductChange(index, 'product', e.target.value)}
                      >
                        <MenuItem value="">Select Product</MenuItem>
                        { storeInventory.filter(inv => inv.quantity > 0).map(inv => (
                          <MenuItem key={inv.product._id} value={inv.product._id}>
                            {inv.product.name} - Stock: {inv.quantity}
                          </MenuItem>
                        )) }
                      </Select>
                    </FormControl>
                    {item.product && (
                      <Typography variant="caption" color="primary" display="block" sx={{ mt: 1 }}>
                        📦 Stock disponible: {availableStock} unidades
                        {selectedProduct && ` | Precio sugerido: S/. ${selectedProduct.price}`}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      required
                      fullWidth
                      label="Cantidad"
                      type="number"
                      inputProps={{ min: 1, max: availableStock }}
                      value={item.quantity}
                      onChange={e => handleProductChange(index, 'quantity', e.target.value)}
                      error={item.quantity > availableStock}
                      helperText={item.quantity > availableStock ? 'Excede el stock' : ''}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      required
                      fullWidth
                      label="Precio"
                      type="number"
                      value={item.price}
                      onChange={e => handleProductChange(index, 'price', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            );
          })}
          <Button variant="outlined" onClick={handleAddProduct} sx={{ mb: 3 }}>
            Agregar Producto
          </Button>
          <TextField
            margin="normal"
            fullWidth
            label="Precio Total"
            value={totalPrice.toFixed(2)}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Venta
          </Button>
        </Box>
    </Box>
  );
}

export default CreateSale;