import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, FormControl, InputLabel, Select, MenuItem, Grid, Alert } from '@mui/material';

const CreatePurchase = ({ onClose }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [purchaseProducts, setPurchaseProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('/api/suppliers/')
      .then(response => {
        if (response.data.length > 0) {
          setSuppliers(response.data);
          setSelectedSupplier(response.data[0]._id);
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
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('/api/products/')
      .then(response => {
        if (response.data.length > 0) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handleAddProduct = () => {
    setPurchaseProducts([...purchaseProducts, { 
      product: '', 
      quantity: 0, 
      cost: 0, 
      isNewProduct: false,
      newProductName: '',
      newProductDescription: '',
      newProductSku: ''
    }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...purchaseProducts];
    updatedProducts[index][field] = value;
    
    // Si selecciona "new" como producto, marcar como nuevo producto
    if (field === 'product' && value === 'new') {
      updatedProducts[index].isNewProduct = true;
    } else if (field === 'product' && value !== 'new') {
      updatedProducts[index].isNewProduct = false;
    }
    
    setPurchaseProducts(updatedProducts);
    calculateTotalCost(updatedProducts);
  };

  const calculateTotalCost = (products) => {
    const total = products.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
    setTotalCost(total);
  };

  const createNewProduct = async (productData) => {
    try {
      const response = await axios.post('/api/products/add', {
        name: productData.newProductName,
        description: productData.newProductDescription,
        sku: productData.newProductSku,
        price: productData.cost // Usar el costo como precio inicial
      });
      
      // Refrescar la lista de productos
      const productsResponse = await axios.get('/api/products/');
      setProducts(productsResponse.data);
      
      // Encontrar el nuevo producto creado
      const newProduct = productsResponse.data.find(p => p.sku === productData.newProductSku);
      return newProduct._id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Crear nuevos productos si es necesario
      const processedProducts = [];
      
      for (const item of purchaseProducts) {
        let productId = item.product;
        
        if (item.isNewProduct) {
          // Validar campos del nuevo producto
          if (!item.newProductName || !item.newProductDescription || !item.newProductSku) {
            setError('Por favor completa todos los campos del nuevo producto');
            return;
          }
          
          productId = await createNewProduct(item);
        }
        
        processedProducts.push({
          product: productId,
          quantity: parseInt(item.quantity),
          cost: parseFloat(item.cost)
        });
      }

      const purchase = {
        supplier: selectedSupplier,
        store: selectedStore,
        products: processedProducts,
        totalCost
      }

      console.log('Sending purchase data:', purchase);

      const response = await axios.post('/api/purchases/add', purchase);
      console.log('Success:', response.data);
      setSuccess('¡Compra creada exitosamente!');
      
      // Reset form
      setPurchaseProducts([]);
      setTotalCost(0);
      setSelectedSupplier(suppliers.length > 0 ? suppliers[0]._id : '');
      setSelectedStore(stores.length > 0 ? stores[0]._id : '');
      
      // Close modal after a short delay
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error details:', error);
      setError(`Error al crear la compra: ${error.response?.data?.message || error.message}`);
    }
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
          <InputLabel id="supplier-label">Proveedor</InputLabel>
          <Select
            labelId="supplier-label"
            id="supplier"
            value={selectedSupplier}
            label="Proveedor"
            onChange={e => setSelectedSupplier(e.target.value)}
          >
            { suppliers.map(supplier => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.name}
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
            onChange={e => setSelectedStore(e.target.value)}
          >
            { stores.map(store => (
              <MenuItem key={store._id} value={store._id}>
                {store.name}
              </MenuItem>
            )) }
          </Select>
        </FormControl>
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Productos</Typography>
        {purchaseProducts.map((item, index) => (
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
                      <MenuItem value="new">➕ Crear Nuevo Producto</MenuItem>
                      { products.map(product => (
                        <MenuItem key={product._id} value={product._id}>
                          {product.name} - {product.sku}
                        </MenuItem>
                      )) }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    required
                    fullWidth
                    label="Cantidad"
                    type="number"
                    value={item.quantity}
                    onChange={e => handleProductChange(index, 'quantity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    required
                    fullWidth
                    label="Costo"
                    type="number"
                    value={item.cost}
                    onChange={e => handleProductChange(index, 'cost', e.target.value)}
                  />
                </Grid>
                
                {/* Campos para nuevo producto */}
                {item.isNewProduct && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>
                        Datos del Nuevo Producto:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        required
                        fullWidth
                        label="Nombre del Producto"
                        value={item.newProductName}
                        onChange={e => handleProductChange(index, 'newProductName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        required
                        fullWidth
                        label="Descripción"
                        value={item.newProductDescription}
                        onChange={e => handleProductChange(index, 'newProductDescription', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        required
                        fullWidth
                        label="SKU/Código"
                        value={item.newProductSku}
                        onChange={e => handleProductChange(index, 'newProductSku', e.target.value)}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddProduct} sx={{ mb: 3 }}>
            Agregar Producto
          </Button>
          <TextField
            margin="normal"
            fullWidth
            label="Costo Total"
            value={totalCost.toFixed(2)}
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
            Crear Compra
          </Button>
        </Box>
    </Box>
  );
}

export default CreatePurchase;