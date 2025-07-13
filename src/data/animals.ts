import { Animal, AnimalCategory, ConservationStatus } from '../types';

export const animalsData: Animal[] = [
  {
    id: '1',
    name: 'Lion Africain',
    title: 'Le Roi de la Savane',
    topic: 'Faune Africaine',
    author: 'Wildlife Explorer',
    description: 'Le lion africain, symbole de puissance et de majesté, règne sur les savanes d\'Afrique. Ces félins sociaux vivent en groupes familiaux appelés fiertés et sont les seuls félins à avoir développé une structure sociale complexe.',
    image: '/images/Lion.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savanes, prairies et forêts claires d\'Afrique subsaharienne',
    conservationStatus: ConservationStatus.VULNERABLE,
    facts: [
      'Les lions peuvent rugir jusqu\'à 8 km de distance',
      'Les lionnes chassent en groupe avec une stratégie coordonnée',
      'Un lion mâle peut peser jusqu\'à 250 kg',
      'Les lions dorment jusqu\'à 20 heures par jour'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Kenya', 'Tanzanie', 'Botswana', 'Afrique du Sud', 'Zambie'],
      coordinates: {
        lat: -2.0,
        lng: 37.0
      }
    },
    physicalCharacteristics: {
      weight: '120-250 kg',
      height: '1.2 m au garrot',
      length: '2.5-3.3 m',
      lifespan: '12-16 ans dans la nature'
    },
    behavior: {
      diet: 'Carnivore - zèbres, gnous, buffles, antilopes',
      socialStructure: 'Vie en fierté de 10-15 individus',
      activityPattern: 'Principalement nocturne et crépusculaire'
    },
    threats: [
      'Perte d\'habitat due à l\'expansion agricole',
      'Conflits avec les communautés locales',
      'Braconnage pour les trophées',
      'Diminution des proies naturelles'
    ],
    gallery: [
      '/images/Lion.png',
      '/images/img2.jpg'
    ]
  },
  {
    id: '2',
    name: 'Éléphant d\'Afrique',
    title: 'Le Géant Bienveillant',
    topic: 'Mégafaune Africaine',
    author: 'Conservation Team',
    description: 'L\'éléphant d\'Afrique est le plus grand mammifère terrestre. Ces géants intelligents et sociaux jouent un rôle crucial dans leur écosystème en tant qu\'espèce clé de voûte.',
    image: '/images/Elephant.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savanes, forêts et déserts d\'Afrique',
    conservationStatus: ConservationStatus.ENDANGERED,
    facts: [
      'Peuvent consommer jusqu\'à 300 kg de végétation par jour',
      'Leur trompe contient plus de 40 000 muscles',
      'Excellent mémoire - se souviennent des points d\'eau sur des décennies',
      'Communiquent par infrasons sur de longues distances'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Botswana', 'Zimbabwe', 'Kenya', 'Tanzanie', 'Namibie'],
      coordinates: {
        lat: -20.0,
        lng: 25.0
      }
    },
    physicalCharacteristics: {
      weight: '4000-7000 kg',
      height: '3-4 m au garrot',
      length: '6-7 m',
      lifespan: '60-70 ans'
    },
    behavior: {
      diet: 'Herbivore - herbes, fruits, écorces, racines',
      socialStructure: 'Matriarcal - groupes familiaux dirigés par la femelle la plus âgée',
      activityPattern: 'Actif jour et nuit avec des périodes de repos'
    },
    threats: [
      'Braconnage pour l\'ivoire',
      'Fragmentation de l\'habitat',
      'Conflits homme-éléphant',
      'Changement climatique'
    ],
    gallery: [
      '/images/Elephant.jpg'
    ]
  },
  {
    id: '3',
    name: 'Tigre du Bengale',
    title: 'Le Prédateur Solitaire',
    topic: 'Félins d\'Asie',
    author: 'Big Cat Specialist',
    description: 'Le tigre du Bengale est le plus grand félin sauvage et l\'un des prédateurs les plus redoutables d\'Asie. Chasseur solitaire et territorial, il est devenu le symbole de la conservation.',
    image: '/images/tigre.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Forêts tropicales, mangroves et prairies d\'Asie du Sud',
    conservationStatus: ConservationStatus.ENDANGERED,
    facts: [
      'Peut sauter horizontalement jusqu\'à 10 mètres',
      'Excellent nageur, contrairement aux autres félins',
      'Chaque tigre a un motif de rayures unique',
      'Peut consommer jusqu\'à 25 kg de viande en une seule fois'
    ],
    location: {
      continent: 'Asie',
      countries: ['Inde', 'Bangladesh', 'Népal', 'Bhoutan'],
      coordinates: {
        lat: 23.0,
        lng: 90.0
      }
    },
    physicalCharacteristics: {
      weight: '140-300 kg',
      height: '0.9-1.1 m au garrot',
      length: '2.7-3.1 m',
      lifespan: '10-15 ans dans la nature'
    },
    behavior: {
      diet: 'Carnivore - cerfs, sangliers, buffles d\'eau',
      socialStructure: 'Solitaire et territorial',
      activityPattern: 'Principalement nocturne'
    },
    threats: [
      'Braconnage pour la médecine traditionnelle',
      'Perte d\'habitat forestier',
      'Conflits avec les humains',
      'Diminution des proies'
    ],
    gallery: [
      '/images/tigre.png'
    ]
  },
  {
    id: '4',
    name: 'Girafe Masaï',
    title: 'La Géante Élégante',
    topic: 'Herbivores Africains',
    author: 'Savanna Research',
    description: 'La girafe Masaï est le plus grand mammifère terrestre. Avec son cou extraordinaire et ses motifs uniques, elle symbolise l\'élégance de la faune africaine.',
    image: '/images/Girafe.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savanes et forêts d\'acacias d\'Afrique de l\'Est',
    conservationStatus: ConservationStatus.ENDANGERED,
    facts: [
      'Peut mesurer jusqu\'à 5.5 mètres de hauteur',
      'Son cœur pèse 11 kg et pompe 60 litres de sang par minute',
      'Sa langue peut mesurer jusqu\'à 50 cm',
      'Dort seulement 30 minutes à 2 heures par jour'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Kenya', 'Tanzanie'],
      coordinates: {
        lat: -2.5,
        lng: 36.0
      }
    },
    physicalCharacteristics: {
      weight: '800-1200 kg',
      height: '4.5-5.5 m',
      length: '3.8-4.7 m',
      lifespan: '20-25 ans'
    },
    behavior: {
      diet: 'Herbivore - principalement feuilles d\'acacia',
      socialStructure: 'Groupes lâches de 10-20 individus',
      activityPattern: 'Diurne avec des pics d\'activité matin et soir'
    },
    threats: [
      'Perte d\'habitat due à l\'agriculture',
      'Fragmentation des territoires',
      'Braconnage pour la viande et les trophées',
      'Conflits avec l\'élevage'
    ],
    gallery: [
      '/images/Girafe.png'
    ]
  },
  {
    id: '5',
    name: 'Léopard d\'Afrique',
    title: 'Le Fantôme des Savanes',
    topic: 'Prédateurs Africains',
    author: 'Predator Watch',
    description: 'Le léopard d\'Afrique est l\'un des félins les plus adaptables et discrets. Excellent grimpeur et chasseur opportuniste, il survit dans des habitats très variés.',
    image: '/images/leopard.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Forêts, savanes, montagnes et zones semi-désertiques',
    conservationStatus: ConservationStatus.NEAR_THREATENED,
    facts: [
      'Peut hisser des proies de 50 kg dans les arbres',
      'Excellent nageur et grimpeur',
      'Territoire pouvant s\'étendre sur 30 km²',
      'Vision nocturne 6 fois supérieure à celle de l\'homme'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Afrique du Sud', 'Botswana', 'Kenya', 'Tanzanie', 'Namibie'],
      coordinates: {
        lat: -15.0,
        lng: 25.0
      }
    },
    physicalCharacteristics: {
      weight: '30-90 kg',
      height: '0.6-0.7 m au garrot',
      length: '1.0-1.9 m',
      lifespan: '12-17 ans'
    },
    behavior: {
      diet: 'Carnivore - antilopes, primates, oiseaux, poissons',
      socialStructure: 'Solitaire et territorial',
      activityPattern: 'Principalement nocturne et crépusculaire'
    },
    threats: [
      'Perte d\'habitat',
      'Conflits avec l\'élevage',
      'Braconnage pour la fourrure',
      'Diminution des proies'
    ],
    gallery: [
      '/images/leopard.jpg'
    ]
  },
  {
    id: '6',
    name: 'Guépard',
    title: 'Le Sprinter des Savanes',
    topic: 'Vitesse Animale',
    author: 'Speed Research',
    description: 'Le guépard est l\'animal terrestre le plus rapide au monde. Spécialisé dans la chasse à haute vitesse, il représente l\'évolution poussée à l\'extrême.',
    image: '/images/Guepard.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savanes ouvertes et semi-déserts d\'Afrique',
    conservationStatus: ConservationStatus.VULNERABLE,
    facts: [
      'Peut atteindre 110 km/h en 3 secondes',
      'Ses griffes non-rétractiles lui donnent une meilleure adhérence',
      'Taux de réussite de chasse de 50%',
      'Doit se reposer 30 minutes après chaque sprint'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Namibie', 'Botswana', 'Kenya', 'Tanzanie'],
      coordinates: {
        lat: -20.0,
        lng: 20.0
      }
    },
    physicalCharacteristics: {
      weight: '35-65 kg',
      height: '0.7-0.9 m au garrot',
      length: '1.1-1.5 m',
      lifespan: '8-12 ans'
    },
    behavior: {
      diet: 'Carnivore - gazelles, impalas, lièvres',
      socialStructure: 'Femelles solitaires, mâles en coalitions',
      activityPattern: 'Diurne pour éviter la compétition'
    },
    threats: [
      'Perte d\'habitat due à l\'agriculture',
      'Conflits avec l\'élevage',
      'Trafic illégal d\'animaux',
      'Consanguinité génétique'
    ],
    gallery: [
      '/images/Guepard.png'
    ]
  },
  {
    id: '7',
    name: 'Élan d\'Europe',
    title: 'Le Géant des Forêts Nordiques',
    topic: 'Faune Européenne',
    author: 'Nordic Wildlife',
    description: 'L\'élan d\'Europe est le plus grand cervidé au monde. Parfaitement adapté aux forêts boréales, il symbolise la nature sauvage du Nord.',
    image: '/images/Elan.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Forêts boréales et toundra d\'Europe du Nord',
    conservationStatus: ConservationStatus.LEAST_CONCERN,
    facts: [
      'Peut peser jusqu\'à 700 kg',
      'Ses bois peuvent mesurer 2 mètres d\'envergure',
      'Excellent nageur, peut plonger jusqu\'à 6 mètres',
      'Peut courir à 55 km/h malgré sa taille'
    ],
    location: {
      continent: 'Europe',
      countries: ['Suède', 'Norvège', 'Finlande', 'Russie', 'Canada'],
      coordinates: {
        lat: 65.0,
        lng: 25.0
      }
    },
    physicalCharacteristics: {
      weight: '270-700 kg',
      height: '1.4-2.1 m au garrot',
      length: '2.4-3.2 m',
      lifespan: '15-25 ans'
    },
    behavior: {
      diet: 'Herbivore - feuilles, pousses, plantes aquatiques',
      socialStructure: 'Solitaire sauf pendant la reproduction',
      activityPattern: 'Crépusculaire et nocturne'
    },
    threats: [
      'Collisions routières',
      'Chasse excessive dans certaines régions',
      'Changement climatique affectant l\'habitat',
      'Fragmentation forestière'
    ],
    gallery: [
      '/images/Elan.jpg'
    ]
  }
];

// Fonctions utilitaires pour rechercher et filtrer les animaux
export const getAnimalById = (id: string): Animal | undefined => {
  return animalsData.find(animal => animal.id === id);
};

export const getAnimalsByCategory = (category: AnimalCategory): Animal[] => {
  return animalsData.filter(animal => animal.category === category);
};

export const getAnimalsByConservationStatus = (status: ConservationStatus): Animal[] => {
  return animalsData.filter(animal => animal.conservationStatus === status);
};

export const searchAnimals = (searchTerm: string): Animal[] => {
  const term = searchTerm.toLowerCase();
  return animalsData.filter(animal =>
    animal.name.toLowerCase().includes(term) ||
    animal.description.toLowerCase().includes(term) ||
    animal.habitat.toLowerCase().includes(term) ||
    animal.location.continent.toLowerCase().includes(term) ||
    animal.facts.some(fact => fact.toLowerCase().includes(term))
  );
};