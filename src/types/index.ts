// Types pour les animaux et le slider
export interface Animal {
  id: string;
  name: string;
  title: string;
  topic: string;
  author: string;
  description: string;
  image: string;
  category: AnimalCategory;
  habitat: string;
  conservationStatus: ConservationStatus;
  facts: string[];
  location: {
    continent: string;
    countries: string[];
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  physicalCharacteristics: {
    weight: string;
    height: string;
    length?: string;
    lifespan: string;
  };
  behavior: {
    diet: string;
    socialStructure: string;
    activityPattern: string;
  };
  threats: string[];
  gallery: string[];
}

export enum AnimalCategory {
  MAMMAL = 'mammal',
  BIRD = 'bird',
  REPTILE = 'reptile',
  AMPHIBIAN = 'amphibian',
  FISH = 'fish',
  INVERTEBRATE = 'invertebrate'
}

export enum ConservationStatus {
  LEAST_CONCERN = 'Least Concern',
  NEAR_THREATENED = 'Near Threatened',
  VULNERABLE = 'Vulnerable',
  ENDANGERED = 'Endangered',
  CRITICALLY_ENDANGERED = 'Critically Endangered',
  EXTINCT_IN_WILD = 'Extinct in the Wild',
  EXTINCT = 'Extinct'
}

export interface SliderSettings {
  autoPlay: boolean;
  autoPlayInterval: number;
  showThumbnails: boolean;
  showProgressBar: boolean;
  enableKeyboardNavigation: boolean;
  enableMouseWheel: boolean;
  transitionDuration: number;
  pauseOnHover: boolean;
}

export interface SliderState {
  currentIndex: number;
  isAnimating: boolean;
  direction: 'next' | 'prev';
  isPaused: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface FilterOptions {
  category?: AnimalCategory;
  conservationStatus?: ConservationStatus;
  continent?: string;
  searchTerm?: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface SliderEvent {
  type: 'slide' | 'pause' | 'resume' | 'autoplay';
  currentIndex: number;
  previousIndex?: number;
  timestamp: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  autoPlay: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  language: string;
}

export interface AnimalStats {
  totalAnimals: number;
  byCategory: Record<AnimalCategory, number>;
  byConservationStatus: Record<ConservationStatus, number>;
  byContinent: Record<string, number>;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// Types pour les hooks personnalisés
export interface UseSliderReturn {
  currentIndex: number;
  isAnimating: boolean;
  direction: 'next' | 'prev';
  isPaused: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export interface UseAnimalsReturn {
  animals: Animal[];
  loading: boolean;
  error: AppError | null;
  searchAnimals: (term: string) => void;
  filterAnimals: (filters: FilterOptions) => void;
  getAnimalById: (id: string) => Animal | undefined;
  refreshData: () => Promise<void>;
}