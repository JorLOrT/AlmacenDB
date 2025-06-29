import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '../common/FormModal';
import CreateStore from './CreateStore';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = () => {
    axios.get('/api/stores/')
      .then(response => {
        setStores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    loadStores();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Tiendas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Nueva Tienda
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Teléfono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow
                key={store._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {store.name}
                </TableCell>
                <TableCell>{store.location}</TableCell>
                <TableCell>{store.ciudad || '-'}</TableCell>
                <TableCell>{store.telefono || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        title="Crear Nueva Tienda"
        maxWidth="sm"
      >
        <CreateStore onClose={handleModalClose} />
      </FormModal>
    </Box>
  );
}

export default StoreList;