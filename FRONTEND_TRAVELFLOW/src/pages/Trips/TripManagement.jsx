import { useState, useRef, useEffect } from 'react';
import tripService from '../../services/tripService.js';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert as MuiAlert
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';

export default function TripManagement() {
  const initialFormState = {
    id: null,
    destination: '',
    location: '',
    pricePerPerson: '',
    description: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [trips, setTrips] = useState([]);
  const [editMode, setEditMode] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  
  useEffect(() => {
    loadTrips();
  }, []);
  
  const loadTrips = async () => {
    setLoading(true);
    try {
      const tripsData = await tripService.getAllTrips();
      setTrips(tripsData || []);
    } catch (error) {
      console.error('Error loading trips:', error);
      showSnackbar('Erro ao carregar destinos', 'error');
      setTrips([]); 
    } finally {
      setLoading(false);
    }
  };
  
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Imagem muito grande. Tamanho máximo: 5MB', 'error');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      if (errors.image) {
        setErrors({ ...errors, image: null });
      }
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.destination) newErrors.destination = 'Destino é obrigatório';
    if (!formData.location) newErrors.location = 'Localização é obrigatória';
    if (!formData.description) newErrors.description = 'Descrição é obrigatória';
    if (!formData.pricePerPerson) {
      newErrors.pricePerPerson = 'Preço é obrigatório';
    } else if (isNaN(Number(formData.pricePerPerson)) || Number(formData.pricePerPerson) <= 0) {
      newErrors.pricePerPerson = 'Preço deve ser um valor numérico positivo';
    }
    
    if (!editMode && !selectedImage) {
      newErrors.image = 'Imagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedImage(null);
    setImagePreview(null);
    setEditMode(false);
    setErrors({});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setLoading(true);
      try {
        const tripData = {
          destination: formData.destination,
          location: formData.location,
          pricePerPerson: parseFloat(formData.pricePerPerson),
          description: formData.description,
          imageUrl: imagePreview || formData.imageUrl
        };

        if (editMode) {
          await tripService.updateTrip(formData.id, tripData);
          showSnackbar('Destino atualizado com sucesso!', 'success');
        } else {
          await tripService.createTrip(tripData);
          showSnackbar('Novo destino cadastrado com sucesso!', 'success');
        }
        
        resetForm();
        loadTrips(); 
      } catch (error) {
        console.error('Error saving trip:', error);
        showSnackbar('Erro ao salvar destino: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleEdit = (trip) => {
    setFormData({
      id: trip.id,
      destination: trip.destination,
      location: trip.location,
      pricePerPerson: trip.pricePerPerson.toString(),
      description: trip.description,
      imageUrl: trip.imageUrl
    });
    setImagePreview(trip.imageUrl);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDeleteClick = (trip) => {
    setTripToDelete(trip);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!tripToDelete) return;
    
    setLoading(true);
    try {
      await tripService.deleteTrip(tripToDelete.id);
      showSnackbar('Destino removido com sucesso!', 'success');
      setOpenDeleteDialog(false);
      setTripToDelete(null);
      loadTrips(); 
    } catch (error) {
      console.error('Error deleting trip:', error);
      showSnackbar('Erro ao remover destino: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
        Gerenciamento de Destinos
      </Typography>
      
      {/* Formulário de Cadastro/Edição */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3, pb: 2, borderBottom: '2px solid', borderColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {editMode ? 'Editar Destino Turístico' : 'Cadastro de Destino Turístico'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editMode ? 'Atualize as informações do destino' : 'Preencha os dados do novo destino turístico'}
          </Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Coluna Esquerda: Informações do Destino + Precificação */}
            <Grid item xs={12} lg={6}>
              {/* Seção: Informações Básicas */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                Informações do Destino
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    fullWidth
                    size="large"
                    id="destination"
                    name="destination"
                    label="Nome do Destino"
                    placeholder="Ex: Praia do Forte, Fernando de Noronha"
                    value={formData.destination}
                    onChange={handleChange}
                    error={!!errors.destination}
                    helperText={errors.destination || 'Digite o nome principal do destino'}
                    sx={{ minWidth: '300px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    size="large"
                    id="pricePerPerson"
                    name="pricePerPerson"
                    label="Preço por Pessoa"
                    placeholder="0.00"
                    type="number"
                    value={formData.pricePerPerson}
                    onChange={handleChange}
                    error={!!errors.pricePerPerson}
                    helperText={errors.pricePerPerson || 'Valor individual do pacote'}
                    sx={{ minWidth: '200px' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size="large"
                    id="location"
                    name="location"
                    label="Localização Completa"
                    placeholder="Cidade, Estado, País"
                    value={formData.location}
                    onChange={handleChange}
                    error={!!errors.location}
                    helperText={errors.location || 'Ex: Salvador, Bahia, Brasil'}
                    sx={{ minWidth: '300px' }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Coluna Direita: Descrição */}
            <Grid item xs={12} lg={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                Descrição
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    name="description"
                    label="Descrição Detalhada"
                    placeholder="Descreva os atrativos, atividades incluídas, diferenciais do destino..."
                    multiline
                    rows={8}
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description || 'Forneça uma descrição atrativa e completa do destino'}
                    sx={{ minWidth: '350px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
            
            
          {/* Seção: Imagem e Botões */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                Imagem do Destino
              </Typography>
              
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  p: 2,
                  border: '2px dashed',
                  borderColor: imagePreview ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  backgroundColor: 'grey.50',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.50'
                  }
                }}
              >
                {!imagePreview ? (
                  <>
                    <CloudUploadIcon sx={{ fontSize: 36, color: 'text.secondary' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                        Adicione uma imagem atrativa do destino
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Formatos aceitos: JPG, PNG, GIF (Máx: 5MB)
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      component="span"
                      onClick={handleImageUploadClick}
                      startIcon={<CloudUploadIcon />}
                      size="medium"
                    >
                      Selecionar
                    </Button>
                  </>
                ) : (
                  <>
                    <Box sx={{ position: 'relative' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ 
                          width: '80px', 
                          height: '60px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }} 
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {selectedImage?.name || 'Imagem selecionada'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Imagem carregada com sucesso
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleImageUploadClick}
                      startIcon={<EditIcon />}
                    >
                      Alterar
                    </Button>
                  </>
                )}
              </Box>
              
              {errors.image && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.image}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                height: '100%',
                justifyContent: 'flex-end',
                pt: { xs: 2, md: 6.5 } // Alinha com o título da imagem
              }}>
                {editMode && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={resetForm}
                    startIcon={<CloseIcon />}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                >
                  {loading ? 'Salvando...' : (editMode ? 'Salvar Alterações' : 'Cadastrar Destino')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Lista de Destinos Cadastrados */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Destinos Cadastrados
        </Typography>
        
        {loading && (trips || []).length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (trips || []).length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            Nenhum destino cadastrado ainda.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {(trips || []).map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {trip.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={trip.imageUrl}
                      alt={trip.destination}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {trip.destination}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Localização:</strong> {trip.location}
                    </Typography>
                    <Typography variant="body2" color="primary.main" gutterBottom sx={{ fontWeight: 600 }}>
                      <strong>Preço:</strong> R$ {trip.pricePerPerson?.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {trip.description.length > 100 
                        ? `${trip.description.substring(0, 100)}...` 
                        : trip.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(trip)}
                      variant="outlined"
                    >
                      Editar
                    </Button>
                    <Button 
                      size="small" 
                      color="error" 
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(trip)}
                      variant="outlined"
                    >
                      Excluir
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Snackbar para mensagens */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => !loading && setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o destino <strong>{tripToDelete?.destination}</strong>?
          </DialogContentText>
          <MuiAlert severity="warning" sx={{ mt: 2 }}>
            Esta ação não pode ser desfeita! Todos os dados relacionados a este destino serão removidos.
          </MuiAlert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}
          >
            {loading ? 'Excluindo...' : 'Confirmar Exclusão'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
