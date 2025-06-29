import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '../common/FormModal';
import CreateSupplier from './CreateSupplier';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = () => {
    axios.get('/api/suppliers/')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    loadSuppliers();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Proveedores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Nuevo Proveedor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {supplier.name}
                </TableCell>
                <TableCell>{supplier.razonSocial || '-'}</TableCell>
                <TableCell>{supplier.ruc || '-'}</TableCell>
                <TableCell>{supplier.contact?.phone || supplier.telefono || '-'}</TableCell>
                <TableCell>{supplier.contact?.email || supplier.email || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        title="Crear Nuevo Proveedor"
        maxWidth="md"
      >
        <CreateSupplier onClose={handleModalClose} />
      </FormModal>
    </Box>
  );
}

export default SupplierList;