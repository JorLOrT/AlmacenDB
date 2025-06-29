import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '../common/FormModal';
import CreateCustomer from './CreateCustomer';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    axios.get('/api/customers/')
      .then(response => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    loadCustomers(); // Recargar la lista cuando se cierre el modal
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Nuevo Cliente
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell>{customer.type}</TableCell>
                <TableCell>{customer.contact.phone}</TableCell>
                <TableCell>{customer.contact.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        title="Crear Nuevo Cliente"
        maxWidth="sm"
      >
        <CreateCustomer onClose={handleModalClose} />
      </FormModal>
    </Box>
  );
}

export default CustomerList;