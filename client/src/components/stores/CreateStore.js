import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const CreateStore = ({ onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [telefono, setTelefono] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const store = {
      name,
      location,
      ciudad,
      telefono
    }

    console.log('Sending store data:', store);

    axios.post('/api/stores/add', store)
      .then(res => {
        console.log('Success:', res.data);
        // Limpiar formulario
        setName('');
        setLocation('');
        setCiudad('');
        setTelefono('');
        // Cerrar modal
        if (onClose) onClose();
      })
      .catch(error => {
        console.error('Error details:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        alert(`Error creating store: ${error.message}`);
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
      <TextField
        margin="normal"
        required
        fullWidth
        id="location"
        label="Ubicación"
        name="location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="ciudad"
        label="Ciudad"
        name="ciudad"
        value={ciudad}
        onChange={e => setCiudad(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="telefono"
        label="Teléfono"
        name="telefono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Crear Tienda
      </Button>
    </Box>
  );
}

export default CreateStore;