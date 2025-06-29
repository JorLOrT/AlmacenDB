import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, List, ListItem, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '../common/FormModal';
import CreatePurchase from './CreatePurchase';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPurchases = () => {
    axios.get('/api/purchases/')
      .then(response => {
        setPurchases(response.data);
      })
      .catch((error) => {
        console.log('Error fetching purchases:', error);
      })
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    fetchPurchases(); // Reload purchases after modal closes
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Compras
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{ mb: 2 }}
        >
          Crear Compra
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Proveedor</TableCell>
              <TableCell>Tienda</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Costo Unitario</TableCell>
              <TableCell align="right">Costo Total</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              purchase.products.map((item, index) => (
                <TableRow
                  key={`${purchase._id}-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {index === 0 ? (
                    <>
                      <TableCell rowSpan={purchase.products.length}>
                        {purchase.supplier.name}
                      </TableCell>
                      <TableCell rowSpan={purchase.products.length}>
                        {purchase.store.name}
                      </TableCell>
                    </>
                  ) : null}
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${item.cost.toFixed(2)}</TableCell>
                  {index === 0 ? (
                    <>
                      <TableCell align="right" rowSpan={purchase.products.length}>
                        ${purchase.totalCost.toFixed(2)}
                      </TableCell>
                      <TableCell rowSpan={purchase.products.length}>
                        {purchase.createdAt.substring(0,10)}
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        title="Crear Nueva Compra"
        maxWidth="md"
        fullWidth
      >
        <CreatePurchase onClose={handleModalClose} />
      </FormModal>
    </Box>
  );
}

export default PurchaseList;