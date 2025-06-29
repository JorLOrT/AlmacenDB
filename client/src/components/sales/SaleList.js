import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, List, ListItem, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '../common/FormModal';
import CreateSale from './CreateSale';

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchSales = () => {
    axios.get('/api/sales/')
      .then(response => {
        setSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    fetchSales(); // Reload sales after modal closes
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Ventas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{ mb: 2 }}
        >
          Crear Venta
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Tienda</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio Unitario</TableCell>
              <TableCell align="right">Precio Total</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              sale.products.map((item, index) => (
                <TableRow
                  key={`${sale._id}-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {index === 0 ? (
                    <>
                      <TableCell rowSpan={sale.products.length}>
                        {sale.customer.name}
                      </TableCell>
                      <TableCell rowSpan={sale.products.length}>
                        {sale.store.name}
                      </TableCell>
                    </>
                  ) : null}
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  {index === 0 ? (
                    <>
                      <TableCell align="right" rowSpan={sale.products.length}>
                        ${sale.totalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell rowSpan={sale.products.length}>
                        {sale.createdAt.substring(0,10)}
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
        title="Crear Nueva Venta"
        maxWidth="md"
        fullWidth
      >
        <CreateSale onClose={handleModalClose} />
      </FormModal>
    </Box>
  );
}

export default SaleList;