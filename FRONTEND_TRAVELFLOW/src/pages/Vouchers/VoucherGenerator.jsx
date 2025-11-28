import React, { useState, useEffect } from 'react';
import tripService from '../../services/tripService.js';
import voucherService from '../../services/voucherService.js';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  OutlinedInput,
  Chip, 
  Checkbox, 
  ListItemIcon, 
  Card, 
  CardContent, 
  Divider,
  Snackbar, 
  Alert, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  CircularProgress,
  Table, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  IconButton, 
  InputAdornment
} from '@mui/material';
import { 
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { initEmailService, sendVoucherEmail } from '../../services/emailService';


// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 10,
    objectFit: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    objectFit: 'cover',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderTop: '1px solid #e0e0e0',
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  col: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  voucher: {
    border: '1px solid #ccc',
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  voucherHeader: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  }
});


// Componente do PDF
const VoucherPDF = ({ trips, voucherNumber, customerInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Voucher de Viagem</Text>
        <Text style={styles.subtitle}>Nº {voucherNumber}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Cliente:</Text>
        <Text style={styles.text}>Nome: {customerInfo.name}</Text>
        <Text style={styles.text}>CPF: {customerInfo.cpf}</Text>
        <Text style={styles.text}>Telefone: {customerInfo.phone}</Text>
        <Text style={styles.text}>Email: {customerInfo.email}</Text>
      </View>
      
      {trips.map((trip, index) => (
        <View style={styles.voucher} key={trip.id}>
          <View style={styles.voucherHeader}>
            <Text>DESTINO {index + 1} - {trip.destination.toUpperCase()}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destino:</Text>
            <Text style={styles.text}>{trip.destination}</Text>
            
            <Text style={styles.sectionTitle}>Localização:</Text>
            <Text style={styles.text}>{trip.location}</Text>
            
            <Text style={styles.sectionTitle}>Data da Viagem:</Text>
            <Text style={styles.text}>{trip.date || 'Data não especificada'}</Text>
            
            <Text style={styles.sectionTitle}>Preço por pessoa:</Text>
            <Text style={styles.text}>R$ {trip.pricePerPerson}</Text>
          </View>
        </View>
      ))}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo:</Text>
        <Text style={styles.text}>Total de destinos: {trips.length}</Text>
        <Text style={styles.text}>Valor total: R$ {trips.reduce((sum, trip) => sum + Number(trip.pricePerPerson || 0), 0).toFixed(2)}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instruções:</Text>
        <Text style={styles.text}>1. Apresente este voucher no momento do check-in.</Text>
        <Text style={styles.text}>2. Documento válido mediante apresentação de documento com foto.</Text>
        <Text style={styles.text}>3. Em caso de dúvidas, entre em contato com nossa central de atendimento.</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>Voucher gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</Text>
        <Text>Este documento é uma confirmação oficial da sua reserva.</Text>
      </View>
    </Page>
  </Document>
);


export default function VoucherGenerator() {
  const [allTrips, setAllTrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [voucherNumber, setVoucherNumber] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', cpf: '', phone: '', email: '' });
  const [tripDates, setTripDates] = useState({});
  const [passengerCounts, setPassengerCounts] = useState({});
  const [soldTrips, setSoldTrips] = useState([]);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  
  useEffect(() => {
    loadTrips();
    loadSoldTrips();
    initEmailService();
  }, []);
  
  const loadTrips = async () => {
    try {
      const tripsData = await tripService.getAllTrips();
      setAllTrips(tripsData);
    } catch (error) {
      console.error('Error loading trips:', error);
      setSnackbarMessage('Erro ao carregar destinos');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  
  const loadSoldTrips = async () => {
    try {
      const vouchersData = await voucherService.getAllVouchers();
      setSoldTrips(vouchersData);
    } catch (error) {
      console.error('Error loading vouchers:', error);
    }
  };
  
  useEffect(() => {
    if (selectedTrips.length > 0) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      setVoucherNumber(`${date}-${randomNum}`);
    } else {
      setVoucherNumber('');
    }
  }, [selectedTrips]);
  
  const handleTripChange = (event) => {
    const { value } = event.target;
    setSelectedTrips(value);
  };
  
  const handleRemoveTrip = (tripId) => {
    setSelectedTrips(selectedTrips.filter(id => id !== tripId));
  };
  
  const getSelectedTripObjects = () => {
    return selectedTrips.map(tripId => {
      const trip = allTrips.find(t => t.id === tripId);
      if (trip) {
        const passengerCount = passengerCounts[tripId] || 1;
        return {
          ...trip,
          date: tripDates[tripId] || null,
          passengerCount: passengerCount,
          totalPrice: (trip.pricePerPerson || 0) * passengerCount
        };
      }
      return null;
    }).filter(Boolean);
  };
  
  const handleTripDateChange = (tripId, date) => {
    setTripDates(prev => ({
      ...prev,
      [tripId]: date
    }));
  };
  
  const handlePassengerCountChange = (tripId, count) => {
    setPassengerCounts(prev => ({
      ...prev,
      [tripId]: Math.max(1, count) 
    }));
  };
  
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveSoldTrip = async () => {
    if (selectedTrips.length === 0) {
      setSnackbarMessage('Por favor, selecione pelo menos um destino.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return false;
    }
    
    if (!customerInfo.name || !customerInfo.cpf || !customerInfo.phone) {
      setSnackbarMessage('Por favor, preencha todas as informações do cliente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return false;
    }
    
    try {
      const voucherData = {
        customer: {
          name: customerInfo.name,
          cpf: customerInfo.cpf,
          phone: customerInfo.phone,
          email: customerInfo.email || null
        },
        trips: selectedTrips.map(tripId => ({
          tripId: parseInt(tripId),
          tripDate: tripDates[tripId] || null,
          passengerCount: passengerCounts[tripId] || 1
        }))
      };
      
      const createdVoucher = await voucherService.createVoucher(voucherData);
      
      setSnackbarMessage('Voucher salvo com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      setVoucherNumber(createdVoucher.voucherNumber);
      
      loadSoldTrips();
      
      return true;
    } catch (error) {
      console.error('Error saving voucher:', error);
      setSnackbarMessage('Erro ao salvar voucher: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return false;
    }
  };
  
  const handleSaveVoucher = async () => {
    const saved = await saveSoldTrip();
    if (saved && customerInfo.email) {
      setOpenEmailDialog(true);
    }
  };
  
  const handleSendEmail = async () => {
    setEmailSending(true);
    try {
      const selectedTripObjects = getSelectedTripObjects();
      
      const result = await sendVoucherEmail(
        customerInfo,
        selectedTripObjects,
        voucherNumber,
        selectedTripObjects.reduce((sum, trip) => sum + Number(trip.totalPrice || 0), 0).toFixed(2)
      );
      
      if (result.success) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Email enviado com sucesso!');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Erro ao enviar email: ' + result.message);
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Erro ao enviar email. Por favor, tente novamente.');
    } finally {
      setEmailSending(false);
      setOpenEmailDialog(false);
      setOpenSnackbar(true);
    }
  };
  
  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
  };
  
  const handlePrintPreview = async () => {
    setIsLoading(true);
    
    const saved = await saveSoldTrip();
    
    if (saved) {
      setTimeout(() => {
        setIsLoading(false);
        setSnackbarMessage('Voucher gerado com sucesso!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const selectedTripObjects = getSelectedTripObjects();
  
  const totalPrice = selectedTripObjects.reduce(
    (sum, trip) => sum + Number(trip?.totalPrice || 0), 
    0
  ).toFixed(2);
  
  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Gerador de Voucher
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Informações do Cliente</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Nome do Cliente"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    value={customerInfo.cpf}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Selecione os Destinos</Typography>
              <FormControl fullWidth>
                <InputLabel id="trip-select-label">Destinos</InputLabel>
                <Select
                  labelId="trip-select-label"
                  id="trip-select"
                  multiple
                  value={selectedTrips}
                  onChange={handleTripChange}
                  input={<OutlinedInput label="Destinos" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const trip = allTrips.find(t => t.id === value);
                        return trip ? (
                          <Chip 
                            key={value} 
                            label={trip.destination} 
                            onDelete={() => handleRemoveTrip(value)}
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {allTrips.length === 0 ? (
                    <MenuItem disabled>Nenhum destino cadastrado</MenuItem>
                  ) : (
                    allTrips.map((trip) => (
                      <MenuItem key={trip.id} value={trip.id}>
                        <Checkbox checked={selectedTrips.indexOf(trip.id) > -1} />
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                          {trip.imageUrl ? (
                            <Box 
                              component="img" 
                              src={trip.imageUrl} 
                              sx={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <AddIcon fontSize="small" />
                          )}
                        </ListItemIcon>
                        {trip.destination} - {trip.location}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            
            {selectedTrips.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Destinos Selecionados</Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Destino</TableCell>
                        <TableCell>Localização</TableCell>
                        <TableCell>Preço por pessoa</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Quantidade de Passageiros</TableCell>
                        <TableCell>Preço Total</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedTrips.map((tripId) => {
                        const trip = allTrips.find(t => t.id === tripId);
                        const passengerCount = passengerCounts[tripId] || 1;
                        const totalPrice = (trip?.pricePerPerson || 0) * passengerCount;
                        
                        return trip ? (
                          <TableRow key={trip.id}>
                            <TableCell>{trip.destination}</TableCell>
                            <TableCell>{trip.location}</TableCell>
                            <TableCell>R$ {trip.pricePerPerson}</TableCell>
                            <TableCell>
                              <TextField
                                type="date"
                                size="small"
                                value={tripDates[trip.id] || ''}
                                onChange={(e) => handleTripDateChange(trip.id, e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                size="small"
                                value={passengerCount}
                                onChange={(e) => handlePassengerCountChange(trip.id, parseInt(e.target.value) || 1)}
                                InputProps={{ 
                                  inputProps: { min: 1 },
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Typography variant="caption">pessoa(s)</Typography>
                                    </InputAdornment>
                                  )
                                }}
                                sx={{ width: '150px' }}
                              />
                            </TableCell>
                            <TableCell>R$ {totalPrice.toFixed(2)}</TableCell>
                            <TableCell>
                              <IconButton 
                                size="small" 
                                color="error" 
                                onClick={() => handleRemoveTrip(trip.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ) : null;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', gap: 2, height: '100%', alignItems: 'center' }}>
                {selectedTrips.length > 0 && (
                  <>
                    <PDFDownloadLink
                      document={<VoucherPDF trips={selectedTripObjects} voucherNumber={voucherNumber} customerInfo={customerInfo} />}
                      fileName={`voucher-multiplo-${voucherNumber}.pdf`}
                      style={{
                        textDecoration: 'none',
                        width: '100%'
                      }}
                    >
                      {({ blob, url, loading, error }) => (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          startIcon={<PdfIcon />}
                          disabled={loading || selectedTrips.length === 0 || !customerInfo.name || !customerInfo.cpf || !customerInfo.phone}
                        >
                          {loading ? 'Gerando PDF...' : 'Baixar PDF'}
                        </Button>
                      )}
                    </PDFDownloadLink>
                    
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      startIcon={<PrintIcon />}
                      onClick={handlePrintPreview}
                      disabled={selectedTrips.length === 0 || !customerInfo.name || !customerInfo.cpf || !customerInfo.phone}
                    >
                      Pré-visualizar
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={handleSaveVoucher}
                      disabled={selectedTrips.length === 0 || !customerInfo.name || !customerInfo.cpf || !customerInfo.phone}
                    >
                      Salvar Voucher
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {selectedTrips.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Pré-visualização do Voucher
          </Typography>
          
          <Card sx={{ mt: 2 }}>
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'center' }}>
              <Typography variant="h6">VOUCHER DE VIAGEM MÚLTIPLA</Typography>
              <Typography variant="subtitle1">Nº {voucherNumber}</Typography>
            </Box>
            
            <CardContent>
              <Typography variant="h6" gutterBottom>Informações do Cliente:</Typography>
              <Grid container spacing={2} sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" fontWeight="bold">Nome:</Typography>
                  <Typography variant="body1">{customerInfo.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" fontWeight="bold">CPF:</Typography>
                  <Typography variant="body1">{customerInfo.cpf}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" fontWeight="bold">Telefone:</Typography>
                  <Typography variant="body1">{customerInfo.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" fontWeight="bold">Email:</Typography>
                  <Typography variant="body1">{customerInfo.email}</Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>Destinos Incluídos:</Typography>
              
              {selectedTripObjects.map((trip, index) => (
                <Card key={trip.id} sx={{ mb: 3, border: '1px solid #eee' }}>
                  <Box sx={{ bgcolor: 'grey.100', p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Destino {index + 1}: {trip.destination}</Typography>
                  </Box>
                  
                  <Grid container>
                    <Grid item xs={12}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" fontWeight="bold">Localização:</Typography>
                            <Typography variant="body2" gutterBottom>{trip.location}</Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" fontWeight="bold">Data:</Typography>
                            <Typography variant="body2" gutterBottom>{trip.date || 'Não especificada'}</Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" fontWeight="bold">Passageiros:</Typography>
                            <Typography variant="body2" gutterBottom>{trip.passengerCount || 1}</Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" fontWeight="bold">Preço por pessoa:</Typography>
                            <Typography variant="body2" gutterBottom>R$ {trip.pricePerPerson}</Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" fontWeight="bold">Valor total:</Typography>
                            <Typography variant="body2" gutterBottom>R$ {trip.totalPrice.toFixed(2)}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ))}
              
              <Box sx={{ bgcolor: 'grey.100', p: 2, mt: 2, borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Total de destinos:</Typography>
                    <Typography variant="body1" gutterBottom>{selectedTripObjects.length}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Valor total:</Typography>
                    <Typography variant="body1" gutterBottom>R$ {totalPrice}</Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">Data de emissão:</Typography>
                    <Typography variant="body1" gutterBottom>
                      {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">Instruções:</Typography>
              <Typography variant="body2" paragraph>
                1. Apresente este voucher no momento do check-in em cada destino.<br />
                2. Documento válido mediante apresentação de documento com foto.<br />
                3. Em caso de dúvidas, entre em contato com nossa central de atendimento.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      )}
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      {/* Diálogo para confirmar envio de email */}
      <Dialog
        open={openEmailDialog}
        onClose={handleCloseEmailDialog}
        aria-labelledby="email-dialog-title"
        aria-describedby="email-dialog-description"
      >
        <DialogTitle id="email-dialog-title">
          Enviar Voucher por Email
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="email-dialog-description">
            Deseja enviar o voucher por email para {customerInfo.email}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailDialog} color="primary">
            Cancelar
          </Button>
          <Button 
            onClick={handleSendEmail} 
            color="primary" 
            variant="contained"
            disabled={emailSending}
            startIcon={emailSending ? <CircularProgress size={20} /> : <EmailIcon />}
          >
            {emailSending ? 'Enviando...' : 'Enviar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
