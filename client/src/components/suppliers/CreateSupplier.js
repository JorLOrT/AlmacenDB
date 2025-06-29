import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

const CreateSupplier = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [ruc, setRuc] = useState('');
  const [direccion, setDireccion] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const supplier = {
      name,
      contact: {
        phone,
        email
      },
      razonSocial,
      ruc,
      direccion,
      telefono: phone,
      email
    }

    console.log('Sending supplier data:', supplier);

    axios.post('/api/suppliers/add', supplier)
      .then(res => {
        console.log('Success:', res.data);
        window.location = '/suppliers';
      })
      .catch(error => {
        console.error('Error details:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        alert(`Error creating supplier: ${error.message}`);
      });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nuevo Proveedor
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="razonSocial"
            label="Razón Social"
            name="razonSocial"
            value={razonSocial}
            onChange={e => setRazonSocial(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="ruc"
            label="RUC"
            name="ruc"
            value={ruc}
            onChange={e => setRuc(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="direccion"
            label="Dirección"
            name="direccion"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Teléfono"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Proveedor
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateSupplier;