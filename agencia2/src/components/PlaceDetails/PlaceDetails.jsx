import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url('/lencois-maranhenses.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.div`
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;

  img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    
    img {
      max-width: 100%;
      max-height: 80vh;
    }
  }
`;

const placesData = {
  'lencois-maranhenses': {
    name: 'Lençóis Maranhenses',
    description: [
      'Os Lençóis Maranhenses são um dos destinos mais impressionantes do Brasil, constituindo um parque nacional que abrange uma área de cerca de 155 mil hectares. Esta paisagem única é formada por imensos campos de dunas de areia branca que podem atingir até 40 metros de altura, intercaladas com lagoas de água doce cristalina.',
      'O parque foi criado em junho de 1981 para proteger a região, que apresenta um ecossistema único no mundo. Durante a temporada de chuvas, entre janeiro e junho, as lagoas se formam nos vales entre as dunas, criando um espetáculo visual surpreendente de contraste entre a areia branca e a água azul-esverdeada.',
      'A região possui um microclima peculiar, com uma combinação de alta pluviosidade, temperaturas elevadas e ventos fortes, que contribuem para a formação e manutenção deste ambiente único. Apesar da aparência desértica, os Lençóis Maranhenses não são tecnicamente um deserto devido à alta pluviosidade da região.'
    ],
    gallery: ['/lencois-maranhenses.jpg', '/lencois1.jpg', '/lencois2.jpg', '/lencois3.jpg']
  },
  'farol-mandacaru': {
    name: 'Farol de Mandacaru',
    description: [
      'O Farol de Mandacaru, também conhecido como Farol Preguiças, é um importante ponto turístico localizado na vila de Mandacaru, em Barreirinhas. Com seus 35 metros de altura, o farol oferece uma vista panorâmica espetacular da região.',
      'Construído em 1940, o farol ainda funciona como guia para as embarcações que navegam pela costa maranhense. Do alto de seus 160 degraus, os visitantes podem apreciar uma vista deslumbrante do encontro do Rio Preguiças com o mar, além das dunas e da vegetação local.',
      'A vila de Mandacaru, onde está localizado o farol, é uma comunidade tradicional de pescadores que mantém seus costumes e modo de vida simples, proporcionando aos visitantes uma experiência cultural autêntica.'
    ],
    gallery: ['/farol1.jpg', '/farol2.jpg', '/farol3.jpg', '/farol4.jpg']
  },
  'rio-preguicas': {
    name: 'Rio Preguiças',
    description: [
      'O Rio Preguiças é uma das principais vias de acesso aos Lençóis Maranhenses e um atrativo turístico por si só. Com suas águas calmas e margens repletas de vegetação nativa, o rio serpenteia por 120 quilômetros até desaguar no Oceano Atlântico.',
      'Durante o passeio de barco pelo Rio Preguiças, os visitantes podem observar a rica biodiversidade da região, incluindo diferentes espécies de aves, macacos e outros animais silvestres. As margens do rio são povoadas por comunidades ribeirinhas tradicionais que mantêm viva a cultura local.',
      'O trajeto pelo rio inclui paradas em diversos pontos turísticos, como pequenos povoados, praias desertas e áreas de mangue, proporcionando uma experiência completa da região.'
    ],
    gallery: ['/rio1.jpg', '/rio2.jpg', '/rio3.jpg', '/rio4.jpg']
  },
  'pequenos-lencois': {
    name: 'Pequenos Lençóis',
    description: [
      'Os Pequenos Lençóis, também conhecidos como Lençóis Maranhenses Orientais, são uma extensão menos conhecida, mas igualmente impressionante do parque nacional. Esta área oferece uma experiência mais íntima e exclusiva das dunas e lagoas.',
      'A região apresenta o mesmo fenômeno natural dos Lençóis Maranhenses principais, com dunas de areia branca e lagoas de água doce, porém em uma escala menor e com menos visitantes. Isso permite uma experiência mais tranquila e personalizada.',
      'Os Pequenos Lençóis são ideais para quem busca uma aventura fora do circuito turístico tradicional, oferecendo paisagens igualmente deslumbrantes e a possibilidade de explorar áreas menos visitadas.'
    ],
    gallery: ['/pequenos1.jpg', '/pequenos2.jpg', '/pequenos3.jpg', '/pequenos4.jpg']
  },
  'atins': {
    name: 'Atins',
    description: [
      'Atins é uma vila de pescadores que se transformou em um destino turístico único, combinando rusticidade com charme. Localizada na borda do Parque Nacional dos Lençóis Maranhenses, a vila oferece acesso direto às dunas e ao mar.',
      'Com suas ruas de areia, casas simples e pousadas charmosas, Atins mantém uma atmosfera autêntica e tranquila. A vila é conhecida por ser um dos melhores pontos para a prática de kitesurf no Brasil, graças aos seus ventos constantes e condições ideais.',
      'Além das atividades esportivas, Atins é um excelente ponto de partida para explorar áreas menos visitadas dos Lençóis Maranhenses, oferecendo passeios exclusivos e uma experiência mais intimista com a natureza local.'
    ],
    gallery: ['/atins1.jpg', '/atins2.jpg', '/atins3.jpg', '/atins4.jpg']
  }
};

const PlaceDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const place = placesData[id];

  console.log('ID:', id);
  console.log('Place:', place);

  if (!place) return <div style={{ padding: '2rem', textAlign: 'center' }}>Local não encontrado</div>;

  return (
    <Container>
      <Header />
      <Title>{place.name}</Title>
      <Description>
        {place.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Description>
      <GalleryGrid>
        {place.gallery.map((image, index) => (
          <GalleryImage
            key={index}
            image={image}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </GalleryGrid>

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <img 
            src={selectedImage} 
            alt="Lençóis Maranhenses"
            onClick={(e) => e.stopPropagation()}
          />
        </Modal>
      )}
    </Container>
  );
};

export default PlaceDetails;
