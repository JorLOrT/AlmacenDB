import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      sku,
      price
    }

    console.log('Sending product data:', product);

    axios.post('/api/products/add', product)
      .then(res => {
        console.log('Success:', res.data);
        window.location = '/products';
      })
      .catch(error => {
        console.error('Error details:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        alert(`Error creating product: ${error.message}`);
      });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nuevo Producto
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="sku"
            label="SKU"
            name="sku"
            value={sku}
            onChange={e => setSku(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Producto
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateProduct;