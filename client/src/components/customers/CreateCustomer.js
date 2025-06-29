import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CreateCustomer = ({ onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('persona natural');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const customer = {
      name,
      type,
      contact: {
        phone,
        email
      }
    }

    console.log('Sending customer data:', customer);

    axios.post('/api/customers/add', customer)
      .then(res => {
        console.log('Success:', res.data);
        // Limpiar formulario
        setName('');
        setType('persona natural');
        setPhone('');
        setEmail('');
        // Cerrar modal
        if (onClose) onClose();
      })
      .catch(error => {
        console.error('Error details:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        alert(`Error creating customer: ${error.message}`);
      });
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ p: 2 }}>
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
      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={type}
          label="Tipo"
          onChange={e => setType(e.target.value)}
        >
          <MenuItem value="persona natural">Persona Natural</MenuItem>
          <MenuItem value="empresa">Empresa</MenuItem>
        </Select>
      </FormControl>
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
        Crear Cliente
      </Button>
    </Box>
  );
}

export default CreateCustomer;