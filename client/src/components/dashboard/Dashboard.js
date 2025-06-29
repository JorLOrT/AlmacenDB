import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener inventario (tiendas con productos)
    axios.get('/api/stores/')
      .then(response => {
        setStores(response.data);
      })
      .catch((error) => {
        console.log('Error fetching stores:', error);
      });

    // Obtener clientes
    axios.get('/api/customers/')
      .then(response => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log('Error fetching customers:', error);
      });

    // Obtener proveedores
    axios.get('/api/suppliers/')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log('Error fetching suppliers:', error);
      });

    // Obtener productos
    axios.get('/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, []);

  // Función para obtener el inventario total de un producto
  const getTotalInventory = (productId) => {
    let total = 0;
    stores.forEach(store => {
      const productInStore = store.inventory.find(item => item.product._id === productId);
      if (productInStore) {
        total += productInStore.quantity;
      }
    });
    return total;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Header con logo */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          p: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Avatar 
            src="/logo512.png" 
            alt="Logo de la Empresa"
            sx={{ 
              width: 80, 
              height: 80, 
              mr: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Panel de Control - S.G.A.I.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Sistema de Gestión de Almacenes e Inventarios - Resumen general del inventario, clientes y proveedores.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Inventario de Productos */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Inventario de Productos
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Cantidad Total</TableCell>
                        <TableCell align="right">Precio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => {
                        const totalQuantity = getTotalInventory(product._id);
                        return (
                          <TableRow key={product._id}>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {product.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                SKU: {product.sku}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Chip 
                                label={totalQuantity} 
                                size="small" 
                                color={totalQuantity > 0 ? "success" : "error"}
                              />
                            </TableCell>
                            <TableCell align="right">
                              S/. {product.price}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {products.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No hay productos registrados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Lista de Clientes */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Clientes Registrados
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Contacto</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer._id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {customer.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={customer.type} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" display="block">
                              {customer.contact.phone && `📞 ${customer.contact.phone}`}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {customer.contact.email && `📧 ${customer.contact.email}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      {customers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No hay clientes registrados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Lista de Proveedores */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Proveedores Registrados
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
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
                        <TableRow key={supplier._id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {supplier.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {supplier.razonSocial || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {supplier.ruc || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {supplier.contact?.phone || supplier.telefono || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {supplier.contact?.email || supplier.email || '-'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      {suppliers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No hay proveedores registrados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Resumen de Inventario por Tienda */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Inventario por Tienda
                </Typography>
                {stores.map((store) => (
                  <Box key={store._id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {store.name} - {store.location}
                    </Typography>
                    {store.ciudad && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        📍 {store.ciudad} | 📞 {store.telefono}
                      </Typography>
                    )}
                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {store.inventory.map((item) => (
                            <TableRow key={item.product._id}>
                              <TableCell>{item.product.name}</TableCell>
                              <TableCell align="right">
                                <Chip 
                                  label={item.quantity} 
                                  size="small" 
                                  color={item.quantity > 0 ? "success" : "error"}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                          {store.inventory.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={2} align="center">
                                Sin inventario
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
                {stores.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No hay tiendas registradas
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
