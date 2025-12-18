import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RegionDetails.css';

const regionsData = {
  'lencois-maranhenses': {
    title: "Lençóis Maranhenses",
    description: `O Parque Nacional dos Lençóis Maranhenses é uma das maravilhas naturais mais impressionantes do Brasil. 
    Com suas vastas dunas de areia branca que se estendem por quilômetros e lagoas de água cristalina, o parque oferece 
    uma paisagem única que parece saída de um sonho. Durante a temporada de chuvas, milhares de lagoas de água doce se 
    formam entre as dunas, criando um espetáculo visual deslumbrante.`,
    highlights: [
      "Dunas de areia branca que se estendem por 155 mil hectares",
      "Lagoas de água cristalina com temperatura ideal para banho",
      "Pôr do sol espetacular sobre as dunas",
      "Fauna e flora únicas da região",
      "Experiência cultural com comunidades locais"
    ],
    images: [
      {
        url: "/lagoa-azul/lagoa-azul-vista-aerea.jpeg",
        caption: "Vista aérea das dunas e lagoas"
      },
      {
        url: "/lagoa-azul/lagoa-azul-por-do-sol.jpeg",
        caption: "Lagoa Azul ao pôr do sol"
      },
      {
        url: "/lagoa-azul/lagoa-azul.jpeg",
        caption: "Dunas e vegetação nativa"
      },
      {
        url: "/lagoa-azul/lagoa-azul2.jpeg",
        caption: "Lagoa com água cristalina"
      }
    ],
    bestTime: {
      title: "Melhor época para visitar",
      periods: [
        {
          season: "Alta temporada",
          months: "Julho a Setembro",
          description: "Lagoas cheias e clima perfeito"
        },
        {
          season: "Temporada de chuvas",
          months: "Janeiro a Junho",
          description: "Formação das lagoas"
        },
        {
          season: "Baixa temporada",
          months: "Outubro a Dezembro",
          description: "Menos turistas e preços mais baixos"
        }
      ]
    },
    tours: [
      {
        id: 'lagoa-azul',
        name: 'Lagoa Azul',
        description: 'Passeio para a famosa Lagoa Azul, com paradas para banho e fotos.',
        image: '/lencois-maranhenses.jpg',
        includes: [
          'Transfer hotel-parque-hotel',
          'Guia especializado'
        ],
      },
      {
        id: 'quadriciclo',
        name: 'Trilha para os Lençóis',
        description: 'Passeio de um dia para uma trilha cheia de emoção em veículo 4x4, com paradas para banho e fotos.',
        image: '/pequenos-lencois/foto5.jpeg',
        includes: [
          'Transfer hotel-parque-hotel',
          'Guia especializado'
        ]
      },
      {
        id: 'lagoa-bonita',
        name: 'Lagoa Bonita',
        description: 'Passeio de um dia inteiro pela famosa Lagoa Bonita, com paradas para banho e fotos.',
        image: '/lagoa-bonita/lagoabonita2.png',
        includes: [
          'Transfer hotel-parque-hotel',
          'Guia especializado'
        ]
      }
    ]
  },
  
  'mandacaru': {
    title: "Mandacaru",
    description: `Mandacaru é uma charmosa vila de pescadores localizada às margens do Rio Preguiças. 
    O local é famoso por seu farol histórico, que oferece uma vista panorâmica deslumbrante da região, 
    incluindo as dunas dos Lençóis Maranhenses, o rio e o oceano.`,
    highlights: [
      "Farol histórico com vista panorâmica",
      "Comunidade tradicional de pescadores",
      "Artesanato local",
      "Gastronomia típica",
      "Pôr do sol espetacular"
    ],
    images: [
      {
        url: "/mandacaru/mandacaru1.jpeg",
        caption: "Farol de Mandacaru"
      },
      {
        url: "/mandacaru/mandacaru3.png",
        caption: "Vista do Rio Preguiças"
      }
    ],
    bestTime: {
      title: "Melhor época para visitar",
      periods: [
        {
          season: "Alta temporada",
          months: "Julho a Setembro",
          description: "Clima agradável e dias ensolarados"
        },
        {
          season: "Baixa temporada",
          months: "Outubro a Junho",
          description: "Menos turistas e preços mais acessíveis"
        }
      ]
    },
    tours: [
      {
        id: 'farol-tour',
        name: 'Tour do Farol',
        description: 'Visita guiada ao Farol de Mandacaru com explicações históricas.',
        image: '/mandacaru.webp',
        includes: [
          'Guia local',
          'Entrada no farol'
        ],
      },
      {
        id: 'barco-tour',
        name: 'Passeio de Barco pelo Rio Preguiças',
        description: 'Passeio de barco pelo Rio Preguiças com paradas em Vassouras, Caburé, Mandacaru e Pequenos Lençóis para banho e fotos.',
        image: '/mandacaru/mandacaru2.png',
        includes: [
          'Guia local',
          'Entrada no farol'
        ],
      }
    ]
  },
  'atins': {
    title: "Atins",
    description: `Atins é um paraíso escondido entre as dunas dos Lençóis Maranhenses e o mar, onde o rio preguiças deságua. 
    Esta vila de pescadores preserva sua autenticidade com ruas de areia, casas simples e uma atmosfera tranquila. 
    É um destino perfeito para quem busca contato direto com a natureza e experiências únicas.`,
    highlights: [
      "Praias desertas e inexploradas",
      "Acesso privilegiado aos Lençóis Maranhenses",
      "Esportes aquáticos como kitesurf",
      "Gastronomia local autêntica",
      "Pousadas charmosas e acolhedoras"
    ],
    images: [
      {
        url: "/atins/atins1.jpeg",
        caption: "Praia de Atins"
      },
      {
        url: "/atins/atins2.jpeg",
        caption: "Dunas e mar"
      },
      {
        url: "/atins/atins3.jpeg",
        caption: "Pôr do sol em Atins"
      },
      {
        url: "/atins/atins4.jpeg",
        caption: "Vila de pescadores"
      }
    ],
    bestTime: {
      title: "Melhor época para visitar",
      periods: [
        {
          season: "Alta temporada",
          months: "Julho a Dezembro",
          description: "Ventos ideais para kitesurf"
        },
        {
          season: "Baixa temporada",
          months: "Janeiro a Junho",
          description: "Período de chuvas, lagoas cheias"
        }
      ]
    },
    tours: [
      {
        id: 'atins-aventura',
        name: 'Atins Aventura',
        description: 'Explore as dunas, praias e lagoas da região de Atins.',
        image: '/atins.webp',
        includes: [
          'Transporte 4x4',
          'Guia especializado',
          'Água mineral',
          'Paradas para banho'
        ],
      }
    ]
  },
  'pequenos-lencois': {
    title: "Pequenos Lençóis",
    description: `Os Pequenos Lençóis Maranhenses são uma extensão igualmente deslumbrante do parque principal, 
    oferecendo uma experiência mais intimista e exclusiva. A região apresenta dunas menores, mas igualmente 
    impressionantes, além de lagoas cristalinas e uma vegetação exuberante de vázeas e manguesais.`,
    highlights: [
      "Dunas e lagoas menos movimentadas",
      "Experiência mais exclusiva",
      "Vegetação de mangue preservada",
      "Passeios de barco pelo Rio Preguiças",
      "Comunidades tradicionais"
    ],
    images: [
      {
        url: "/pequenos-lencois/foto3.jpeg",
        caption: "Vista do passeio próximo ao mar"
      },
      {
        url: "/pequenos-lencois/pequenos2.jpeg",
        caption: "Lagoas cristalinas"
      },
      {
        url: "/pequenos-lencois/foto5.jpeg",
        caption: "Dunas"
      }
    ],
    bestTime: {
      title: "Melhor época para visitar",
      periods: [
        {
          season: "Alta temporada",
          months: "Julho a Setembro",
          description: "Lagoas cheias e clima agradável"
        },
        {
          season: "Baixa temporada",
          months: "Outubro a Junho",
          description: "Menos visitantes, preços melhores"
        }
      ]
    },
    tours: [
      {
        id: 'pequenos-lencois-tour',
        name: 'Tour Pequenos Lençóis',
        description: 'Conheça as belezas dos Pequenos Lençóis em um passeio exclusivo.',
        image: '/pequenos-lencois.jpg',
        includes: [
          'Transporte 4x4',
          'Guia local',
          'Água mineral',
          'Paradas para fotos e banho'
        ],
      },
      {
        id: 'pequenos-lencois-tour',
        name: 'Tour Pequenos Lençóis de Barco',
        description: 'Conheça as belezas dos Pequenos Lençóis em um passeio exclusivo.',
        image: '/pequenos-lencois.jpg',
        includes: [
          'Lancha Voadeira',
          'Guia local',
          'Paradas para fotos e banho'
        ],
      }
    ]
  },
  'cardosa': {
    title: "Povoado Cardosa",
    description: `O Povoado Cardosa é uma comunidade tradicional que preserva a autenticidade da cultura maranhense. 
    Localizado às margens do Formiga, o povoado oferece uma experiência única de contato com o modo de vida local, 
    além de ser um ponto estratégico para explorar as belezas naturais da região.`,
    highlights: [
      "Cultura local preservada",
      "Artesanato tradicional",
      "Gastronomia típica",
      "Passeios de boia",
      "Contato com a comunidade local"
    ],
    images: [
      {
        url: "/cardosa/cardosa1.jpeg",
        caption: "Vista do Rio Preguiças"
      },
      {
        url: "/cardosa/cardosa2.jpeg",
        caption: "Comunidade local"
      },
      {
        url: "/cardosa/cardosa3.jpeg",
        caption: "Artesanato local"
      }
    ],
    bestTime: {
      title: "Melhor época para visitar",
      periods: [
        {
          season: "Alta temporada",
          months: "Julho a Setembro",
          description: "Clima ideal para passeios"
        },
        {
          season: "Baixa temporada",
          months: "Outubro a Junho",
          description: "Experiência mais autêntica"
        }
      ]
    },
    tours: [
      {
        id: 'cardosa-cultural',
        name: 'Experiência Cultural Cardosa',
        description: 'Imersão na cultura local com visita às famílias tradicionais.',
        image: '/cardosa.webp',
        includes: [
          'Guia local',
          'Degustação de comidas típicas',
          'Demonstração de artesanato',
          'Passeio pela comunidade'
        ],
      }
    ]
  }
};

const RegionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  
  const regionInfo = regionsData[id] || regionsData['lencois-maranhenses'];
  const tours = regionInfo.tours;

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const handleReservar = (tourName) => {
    const phoneNumber = "5598991333370";
    const message = `Olá! Gostaria de mais informações sobre o passeio: ${tourName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="region-details">
      <header className="region-header">
        <h1>{regionInfo.title}</h1>
        <p className="region-description">{regionInfo.description}</p>
      </header>

      <section className="image-gallery">
        <h2>Conheça o Paraíso</h2>
        <div className="gallery-grid">
          {regionInfo.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image.url} alt={image.caption} />
              <p>{image.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="region-highlights">
        <h2>Destaques da Região</h2>
        <ul>
          {regionInfo.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="best-time">
        <h2>{regionInfo.bestTime.title}</h2>
        <div className="periods-grid">
          {regionInfo.bestTime.periods.map((period, index) => (
            <div key={index} className="period-card">
              <h3>{period.season}</h3>
              <p className="months">{period.months}</p>
              <p className="period-description">{period.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="available-tours">
        <h2>Nossos Passeios na Região</h2>
        <div className="tours-grid">
          {tours.map((tour) => (
            <div key={tour.id} className="tour-card">
              <div className="tour-image" style={{ backgroundImage: `url(${tour.image})` }}>
                <div className="tour-content">
                  <h3>{tour.name}</h3>
                  <p>{tour.description}</p>
                  <div className="tour-details">
                    <p className="duration">
                      <i className="far fa-clock"></i> {tour.duration}
                    </p>
                    <p className="price">{tour.price}</p>
                  </div>
                  <ul className="includes">
                    {tour.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div className="tour-buttons">
                    <button 
                      className="btn-reservar"
                      onClick={() => handleReservar(tour.name)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RegionDetails;
