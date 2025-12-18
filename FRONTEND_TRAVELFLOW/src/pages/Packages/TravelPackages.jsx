import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
  Divider,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  LocalOffer as OfferIcon,
  CardGiftcard as PackageIcon,
  Description as DescriptionIcon,
  Flight as FlightIcon,
  Percent as PercentIcon,
  ToggleOn as StatusIcon
} from '@mui/icons-material';
import packageService from '../../services/packageService';
import tripService from '../../services/tripService';


export default function TravelPackages() {
  const [packages, setPackages] = useState([]);
  const [trips, setTrips] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    tripIds: [],
    discountPercentage: 0,
    active: true,
    imageUrls: []
  });


  useEffect(() => {
    loadPackages();
    loadTrips();
  }, []);


  const loadPackages = async () => {
    setLoading(true);
    try {
      const data = await packageService.getAllPackages();
      setPackages(data);
    } catch (error) {
      console.error('Erro ao carregar pacotes:', error);
    } finally {
      setLoading(false);
    }
  };


  const loadTrips = async () => {
    try {
      const data = await tripService.getAllTrips();
      setTrips(data || []);
    } catch (error) {
      console.error('Erro ao carregar destinos:', error);
      setTrips([]);
    }
  };


  const handleOpenDialog = (pkg = null) => {
    if (pkg) {
      setFormData({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        tripIds: pkg.trips.map(t => t.id),
        discountPercentage: pkg.discountPercentage,
        active: pkg.active,
        imageUrls: pkg.imageUrls || (pkg.imageUrl ? [pkg.imageUrl] : [])
      });
      setImagePreviews(pkg.imageUrls || (pkg.imageUrl ? [pkg.imageUrl] : []));
      setEditMode(true);
    } else {
      setFormData({
        id: null,
        name: '',
        description: '',
        tripIds: [],
        discountPercentage: 0,
        active: true,
        imageUrls: []
      });
      setImagePreviews([]);
      setSelectedImages([]);
      setEditMode(false);
    }
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      id: null,
      name: '',
      description: '',
      tripIds: [],
      discountPercentage: 0,
      active: true,
      imageUrls: []
    });
    setImagePreviews([]);
    setSelectedImages([]);
    setErrors({});
  };


  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };


  const handleTripChange = (event) => {
    setFormData({
      ...formData,
      tripIds: event.target.value
    });
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const validFiles = files.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Imagem ${file.name} muito grande. Tamanho máximo: 5MB`);
          return false;
        }
        return true;
      });
      
      setSelectedImages(prev => [...prev, ...validFiles]);
      
      const previews = validFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(previews).then(results => {
        setImagePreviews(prev => [...prev, ...results]);
      });
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Nome do pacote é obrigatório';
    }
    
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.tripIds || formData.tripIds.length === 0) {
      newErrors.tripIds = 'Selecione pelo menos um destino';
    }
    
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Desconto deve estar entre 0 e 100%';
    }
    
    return newErrors;
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const packageData = {
      ...formData,
      imageUrls: imagePreviews
    };
    
    setLoading(true);
    try {
      if (editMode) {
        await packageService.updatePackage(packageData.id, packageData);
        showSnackbar('Pacote atualizado com sucesso');
      } else {
        await packageService.createPackage(packageData);
        showSnackbar('Pacote criado com sucesso');
      }
      loadPackages();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar pacote:', error);
      showSnackbar('Erro ao salvar pacote', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteClick = (pkg) => {
    setPackageToDelete(pkg);
    setOpenDeleteDialog(true);
  };


  const handleConfirmDelete = async () => {
    if (!packageToDelete) return;


    setLoading(true);
    try {
      await packageService.deletePackage(packageToDelete.id);
      setOpenDeleteDialog(false);
      setPackageToDelete(null);
      loadPackages();
    } catch (error) {
      console.error('Erro ao deletar pacote:', error);
      alert('Erro ao deletar pacote: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  const calculatePackagePrice = (pkg) => {
    const totalPrice = pkg.trips.reduce((sum, trip) => sum + trip.pricePerPerson, 0);
    const discount = totalPrice * (pkg.discountPercentage / 100);
    return {
      original: totalPrice,
      discounted: totalPrice - discount,
      savings: discount
    };
  };


  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color='text.primary'>Pacotes de Viagem</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Pacote
        </Button>
      </Box>


      {loading && packages.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : packages.length === 0 ? (
        <Alert severity="info">Nenhum pacote cadastrado ainda.</Alert>
      ) : (
        <Grid container spacing={3}>
          {packages.map((pkg) => {
            const prices = calculatePackagePrice(pkg);
            return (
              <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                <Card sx={{ 
                  height: '100%', 
                  minHeight: 500,
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  {pkg.imageUrls?.length > 0 ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={pkg.imageUrls[0]}
                      alt={pkg.name}
                      sx={{ objectFit: 'cover', borderRadius: 1 }}
                    />
                  ) : pkg.imageUrl ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={pkg.imageUrl}
                      alt={pkg.name}
                      sx={{ objectFit: 'cover', borderRadius: 1 }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 140,
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1
                      }}
                    >
                      <PackageIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                    </Box>
                  )}
                  {pkg.imageUrls?.length > 1 && (
                    <Box sx={{ display: 'flex', overflowX: 'auto', mt: 1, pb: 1 }}>
                      {pkg.imageUrls.slice(1).map((url, index) => (
                        <Box key={index} sx={{ flex: '0 0 auto', mr: 1 }}>
                          <CardMedia
                            component="img"
                            height="60"
                            width="100"
                            image={url}
                            alt={`${pkg.name} ${index + 2}`}
                            sx={{ objectFit: 'cover', borderRadius: 1 }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2, mt: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {pkg.name}
                      </Typography>
                      {pkg.discountPercentage > 0 && (
                        <Chip
                          icon={<OfferIcon />}
                          label={`${pkg.discountPercentage}% OFF`}
                          color="error"
                          size="small"
                        />
                      )}
                    </Box>


                    <Typography variant="body2" color="textSecondary" paragraph sx={{ mb: 2, lineHeight: 1.4 }}>
                      {pkg.description}
                    </Typography>


                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Destinos incluídos:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {pkg.trips.map((trip) => (
                        <Chip
                          key={trip.id}
                          label={trip.destination}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Box>


                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      {pkg.discountPercentage > 0 && (
                        <Typography
                          variant="body2"
                          sx={{ textDecoration: 'line-through', color: 'text.secondary', mb: 0.5 }}
                        >
                          De: R$ {prices.original.toFixed(2)}
                        </Typography>
                      )}
                      <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                        R$ {prices.discounted.toFixed(2)}
                      </Typography>
                      {pkg.discountPercentage > 0 && (
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                          Economize R$ {prices.savings.toFixed(2)}
                        </Typography>
                      )}
                    </Box>


                    <Box sx={{ mt: 2, pt: 1 }}>
                      <Chip
                        label={pkg.active ? 'Ativo' : 'Inativo'}
                        color={pkg.active ? 'success' : 'default'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </CardContent>


                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog(pkg)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(pkg)}
                    >
                      Excluir
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}


      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PackageIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {editMode ? 'Editar Pacote de Viagem' : 'Novo Pacote de Viagem'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {editMode ? 'Atualize as informações do pacote' : 'Crie um pacote combinando múltiplos destinos'}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
              Informações Básicas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Configure as informações principais do pacote de viagem
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Nome do Pacote"
                name="name"
                placeholder="Ex: Pacote Nordeste Completo, Aventura na Amazônia"
                value={formData.name}
                onChange={handleChange}
                required
                helperText="Digite um nome atrativo para o pacote"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status do Pacote</InputLabel>
                <Select
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                  label="Status do Pacote"
                >
                  <MenuItem value={true}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="Ativo" color="success" size="small" />
                      <Typography variant="body2">Disponível</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value={false}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="Inativo" color="default" size="small" />
                      <Typography variant="body2">Não disponível</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição do Pacote"
                name="description"
                placeholder="Descreva os benefícios e diferenciais deste pacote..."
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                helperText="Forneça uma descrição atrativa do pacote"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
              Destinos Incluídos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Selecione os destinos que fazem parte deste pacote
            </Typography>
          </Box>
            
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Selecione os Destinos</InputLabel>
                <Select
                  multiple
                  value={formData.tripIds}
                  onChange={handleTripChange}
                  input={<OutlinedInput label="Selecione os Destinos" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const trip = trips.find(t => t.id === value);
                        return trip ? (
                          <Chip 
                            key={value} 
                            label={trip.destination} 
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {trips.length === 0 ? (
                    <MenuItem disabled>
                      <Typography variant="body2" color="text.secondary">
                        Nenhum destino cadastrado
                      </Typography>
                    </MenuItem>
                  ) : (
                    trips.map((trip) => (
                      <MenuItem key={trip.id} value={trip.id}>
                        <Checkbox checked={formData.tripIds.indexOf(trip.id) > -1} />
                        <ListItemText
                          primary={trip.destination}
                          secondary={`${trip.location} - R$ ${trip.pricePerPerson}`}
                        />
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              {formData.tripIds.length === 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Selecione pelo menos um destino para criar o pacote
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
              Imagens do Pacote
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Adicione imagens atrativas para apresentar o pacote
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
              />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CloudUploadIcon />}
                onClick={handleImageUploadClick}
                sx={{ mb: 1 }}
              >
                Selecionar Imagens
              </Button>
              {imagePreviews.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {imagePreviews.map((preview, index) => (
                    <Grid item key={index} xs={4}>
                      <Box sx={{ position: 'relative' }}>
                        <img 
                          src={preview} 
                          alt={`Preview ${index}`} 
                          style={{ 
                            width: '100%', 
                            height: '100px', 
                            objectFit: 'cover', 
                            borderRadius: '4px' 
                          }} 
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveImage(index)}
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            right: 0,
                            padding: '2px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
              Desconto Promocional
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Configure um desconto opcional para o pacote
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Desconto Promocional"
                name="discountPercentage"
                type="number"
                placeholder="0"
                value={formData.discountPercentage}
                onChange={handleChange}
                helperText="Desconto aplicado sobre o valor total"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  inputProps: { min: 0, max: 100 }
                }}
              />
            </Grid>
          </Grid>

          {formData.tripIds.length > 0 && (
            <Box 
              sx={{ 
                p: 3, 
                mt: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 2,
                color: 'white',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <OfferIcon sx={{ fontSize: 24 }} />
                Resumo do Pacote
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', p: 2, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Valor Total dos Destinos
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                      R$ {trips
                        .filter(t => formData.tripIds.includes(t.id))
                        .reduce((sum, t) => sum + t.pricePerPerson, 0)
                        .toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
                
                {formData.discountPercentage > 0 && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', p: 2, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          Valor com Desconto
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, color: '#4ade80' }}>
                          R$ {(
                            trips
                              .filter(t => formData.tripIds.includes(t.id))
                              .reduce((sum, t) => sum + t.pricePerPerson, 0) *
                            (1 - formData.discountPercentage / 100)
                          ).toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ bgcolor: 'rgba(74, 222, 128, 0.2)', p: 2, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          💰 Economia de R$ {(
                            trips
                              .filter(t => formData.tripIds.includes(t.id))
                              .reduce((sum, t) => sum + t.pricePerPerson, 0) *
                            (formData.discountPercentage / 100)
                          ).toFixed(2)} ({formData.discountPercentage}% de desconto)
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                )}
                
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    📍 {formData.tripIds.length} {formData.tripIds.length === 1 ? 'destino incluído' : 'destinos incluídos'} neste pacote
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button 
            onClick={handleCloseDialog}
            size="large"
            sx={{ px: 3 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={loading || !formData.name || formData.tripIds.length === 0}
            sx={{ 
              px: 4,
              fontWeight: 600,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            {loading ? 'Salvando...' : (editMode ? 'Salvar Alterações' : 'Criar Pacote')}
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o pacote <strong>{packageToDelete?.name}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Esta ação não pode ser desfeita!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar Exclusão'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensagens */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
