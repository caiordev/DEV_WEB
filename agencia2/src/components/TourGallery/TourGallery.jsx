import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const GallerySection = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Subtitle = styled(motion.p)`
  color: #FF9800;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? '#FF9800' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: 2px solid ${props => props.active ? '#FF9800' : '#e0e0e0'};
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#FF9800' : '#f5f5f5'};
    border-color: ${props => props.active ? '#FF9800' : '#ccc'};
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 280px;
  gap: 1.5rem;
  grid-auto-flow: dense;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
    gap: 1rem;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:nth-child(4n+1) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  &:nth-child(4n+2) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  &:nth-child(4n+3) {
    grid-column: span 1;
    grid-row: span 2;
    
    @media (max-width: 768px) {
      grid-column: span 1;
      grid-row: span 1;
    }
  }
  
  &:nth-child(4n+4) {
    grid-column: span 2;
    grid-row: span 1;
    
    @media (max-width: 768px) {
      grid-column: span 1;
      grid-row: span 1;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
  
  ${GalleryItem}:hover ${GalleryImage} {
    transform: scale(1.05);
  }
`;

const ImageTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ImageCategory = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 152, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  opacity: 0;
  transition: all 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &.prev {
    left: -70px;
  }
  
  &.next {
    right: -70px;
  }
  
  @media (max-width: 992px) {
    width: 40px;
    height: 40px;
    
    &.prev {
      left: -50px;
    }
    
    &.next {
      right: -50px;
    }
  }
  
  @media (max-width: 768px) {
    &.prev {
      left: 10px;
    }
    
    &.next {
      right: 10px;
    }
  }
`;

const ModalCaption = styled.div`
  color: white;
  text-align: center;
  padding: 1rem 0;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const LoadMoreButton = styled(motion.button)`
  background-color: transparent;
  color: #333;
  border: 2px solid #FF9800;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  margin: 3rem auto 0;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #FF9800;
    color: white;
  }
`;

const TourGallery = () => {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(8);
  
  // Gallery data with images from public directory
  const galleryData = [
    {
      id: 1,
      title: 'Lagoa Azul',
      category: 'lagoas',
      image: '/public/rota03.jpg',
      description: 'Vista deslumbrante da Lagoa Azul durante o pôr do sol'
    },
    {
      id: 2,
      title: 'Lagoa Azul',
      category: 'lagoas',
      image: '/public/rota03.jpg',
      description: 'Águas cristalinas da Lagoa Azul em época de cheia'
    },
    {
      id: 3,
      title: 'Lagoa Bonita',
      category: 'lagoas',
      image: '/public/rota03.jpg',
      description: 'Paisagem única da Lagoa Bonita entre dunas'
    },
    {
      id: 4,
      title: 'Passeio de Caiaque',
      category: 'aventura',
      image: '/public/rota03.jpg',
      description: 'Aventura de caiaque nas águas dos Lençóis Maranhenses'
    },
    {
      id: 5,
      title: 'Cardosa',
      category: 'praias',
      image: '/public/rota03.jpg',
      description: 'Belezas naturais da região de Cardosa'
    },
    {
      id: 6,
      title: 'Passeio de Carro',
      category: 'transporte',
      image: '/public/rota03.jpg',
      description: 'Transporte 4x4 para explorar as dunas'
    },
    {
      id: 7,
      title: 'Pequenos Lençóis',
      category: 'paisagens',
      image: '/public/rota03.jpg',
      description: 'Vista panorâmica dos Pequenos Lençóis'
    },
    {
      id: 8,
      title: 'Mandacaru',
      category: 'pontos-turisticos',
      image: '/public/rota03.jpg',
      description: 'Farol de Mandacaru, ponto turístico imperdível'
    },
    {
      id: 9,
      title: 'Lagoa Azul Vista Aérea',
      category: 'lagoas',
      image: '/public/rota03.jpg',
      description: 'Vista aérea impressionante da Lagoa Azul'
    },
    {
      id: 10,
      title: 'Passeio de Caiaque',
      category: 'aventura',
      image: '/public/rota03.jpg',
      description: 'Explorando os rios da região de caiaque'
    },
    {
      id: 11,
      title: 'Pequenos Lençóis',
      category: 'paisagens',
      image: '/public/rota03.jpg',
      description: 'Dunas e lagoas dos Pequenos Lençóis'
    },
    {
      id: 12,
      title: 'Atins',
      category: 'praias',
      image: '/public/rota03.jpg',
      description: 'Praia de Atins, paraíso isolado'
    }
  ];
  
  // Filter categories
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'lagoas', label: 'Lagoas' },
    { id: 'praias', label: 'Praias' },
    { id: 'aventura', label: 'Aventura' },
    { id: 'paisagens', label: 'Paisagens' },
    { id: 'pontos-turisticos', label: 'Pontos Turísticos' }
  ];
  
  // Filter images based on selected category
  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);
  
  // Open modal with selected image
  const openModal = (image) => {
    setCurrentImage(image);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Navigate to previous image
  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImage(filteredImages[prevIndex]);
  };
  
  // Navigate to next image
  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentImage(filteredImages[nextIndex]);
  };
  
  // Load more images
  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 4, filteredImages.length));
  };
  
  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentImage]);
  
  return (
    <GallerySection id="gallery">
      <Container>
        <SectionHeader>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            NOSSA GALERIA
          </Subtitle>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Imagens dos Nossos Passeios
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore nossa coleção de fotos dos mais belos destinos dos Lençóis Maranhenses. 
            Cada imagem captura a essência e a beleza única desta região deslumbrante.
          </Description>
        </SectionHeader>
        
        <FilterContainer>
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              active={filter === category.id}
              onClick={() => {
                setFilter(category.id);
                setVisibleImages(8);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <GalleryGrid
          layout
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredImages.slice(0, visibleImages).map((item) => (
              <GalleryItem
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(item)}
              >
                <GalleryImage src={item.image} alt={item.title} />
                <ImageOverlay>
                  <ImageTitle>{item.title}</ImageTitle>
                  <ImageCategory>{categories.find(cat => cat.id === item.category)?.label}</ImageCategory>
                </ImageOverlay>
                <SearchIcon>
                  <FontAwesomeIcon icon={faSearch} />
                </SearchIcon>
              </GalleryItem>
            ))}
          </AnimatePresence>
        </GalleryGrid>
        
        {visibleImages < filteredImages.length && (
          <LoadMoreButton
            onClick={loadMoreImages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Carregar Mais
          </LoadMoreButton>
        )}
      </Container>
      
      {/* Modal for image preview */}
      <AnimatePresence>
        {modalOpen && currentImage && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <CloseButton onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
              <ModalImage src={currentImage.image} alt={currentImage.title} />
              <ModalCaption>
                <h3>{currentImage.title}</h3>
                <p>{currentImage.description}</p>
              </ModalCaption>
              <NavButton className="prev" onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </NavButton>
              <NavButton className="next" onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}>
                <FontAwesomeIcon icon={faChevronRight} />
              </NavButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GallerySection>
  );
};

export default TourGallery;
