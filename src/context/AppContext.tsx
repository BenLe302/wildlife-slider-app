import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Animal, AnimalCategory, ConservationStatus, FilterOptions, UserPreferences, AnimalStats, AppError } from '../types';
import { animalsData } from '../data/animals';

// État global de l'application
export interface AppState {
  // Données des animaux
  animals: Animal[];
  filteredAnimals: Animal[];
  currentAnimal: Animal | null;
  favorites: string[];
  
  // État de l'interface utilisateur
  loading: boolean;
  error: AppError | null;
  searchTerm: string;
  filters: FilterOptions;
  
  // Préférences utilisateur
  preferences: UserPreferences;
  
  // Statistiques
  stats: AnimalStats | null;
  
  // Navigation
  currentPage: number;
  breadcrumbs: { label: string; path: string }[];
}

// Actions pour modifier l'état
export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_ANIMALS'; payload: Animal[] }
  | { type: 'SET_FILTERED_ANIMALS'; payload: Animal[] }
  | { type: 'SET_CURRENT_ANIMAL'; payload: Animal | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_STATS'; payload: AnimalStats }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_BREADCRUMBS'; payload: { label: string; path: string }[] }
  | { type: 'RESET_FILTERS' };

// Fonctions du contexte
export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // Fonctions utilitaires
  setLoading: (loading: boolean) => void;
  setError: (error: AppError | null) => void;
  setCurrentAnimal: (animal: Animal | null) => void;
  searchAnimals: (term: string) => void;
  filterAnimals: (filters: FilterOptions) => void;
  addFavorite: (animalId: string) => void;
  removeFavorite: (animalId: string) => void;
  toggleFavorite: (animalId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  setBreadcrumbs: (breadcrumbs: { label: string; path: string }[]) => void;
}

// État initial
const initialState: AppState = {
  animals: [],
  filteredAnimals: [],
  currentAnimal: null,
  favorites: JSON.parse(localStorage.getItem('wildlife-favorites') || '[]'),
  loading: false,
  error: null,
  searchTerm: '',
  filters: {},
  preferences: {
    theme: (localStorage.getItem('wildlife-theme') as 'light' | 'dark') || 'dark',
    autoPlay: JSON.parse(localStorage.getItem('wildlife-autoplay') || 'true'),
    soundEnabled: JSON.parse(localStorage.getItem('wildlife-sound') || 'true'),
    animationsEnabled: JSON.parse(localStorage.getItem('wildlife-animations') || 'true'),
    language: localStorage.getItem('wildlife-language') || 'fr',
  },
  stats: null,
  currentPage: 1,
  breadcrumbs: [],
};

// Reducer pour gérer les actions
export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ANIMALS':
      return { ...state, animals: action.payload, filteredAnimals: action.payload };
    
    case 'SET_FILTERED_ANIMALS':
      return { ...state, filteredAnimals: action.payload };
    
    case 'SET_CURRENT_ANIMAL':
      return { ...state, currentAnimal: action.payload };
    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'ADD_FAVORITE':
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('wildlife-favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    
    case 'REMOVE_FAVORITE':
      const updatedFavorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('wildlife-favorites', JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      const toggledFavorites = isFavorite
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem('wildlife-favorites', JSON.stringify(toggledFavorites));
      return { ...state, favorites: toggledFavorites };
    
    case 'SET_PREFERENCES':
      const newPreferences = { ...state.preferences, ...action.payload };
      // Sauvegarder les préférences dans le localStorage
      Object.entries(action.payload).forEach(([key, value]) => {
        localStorage.setItem(`wildlife-${key.toLowerCase()}`, JSON.stringify(value));
      });
      return { ...state, preferences: newPreferences };
    
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_BREADCRUMBS':
      return { ...state, breadcrumbs: action.payload };
    
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {},
        searchTerm: '',
        filteredAnimals: state.animals,
      };
    
    default:
      return state;
  }
};

// Créer le contexte
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook pour utiliser le contexte
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider du contexte
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Fonctions utilitaires
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: AppError | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setCurrentAnimal = (animal: Animal | null) => {
    dispatch({ type: 'SET_CURRENT_ANIMAL', payload: animal });
  };

  const searchAnimals = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    
    if (!term.trim()) {
      dispatch({ type: 'SET_FILTERED_ANIMALS', payload: state.animals });
      return;
    }

    const filtered = state.animals.filter(animal =>
      animal.name.toLowerCase().includes(term.toLowerCase()) ||
      animal.description.toLowerCase().includes(term.toLowerCase()) ||
      animal.habitat.toLowerCase().includes(term.toLowerCase()) ||
      animal.location.continent.toLowerCase().includes(term.toLowerCase())
    );
    
    dispatch({ type: 'SET_FILTERED_ANIMALS', payload: filtered });
  };

  const filterAnimals = (filters: FilterOptions) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    
    let filtered = [...state.animals];

    // Appliquer le terme de recherche
    if (state.searchTerm) {
      filtered = filtered.filter(animal =>
        animal.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        animal.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Appliquer les filtres
    if (filters.category) {
      filtered = filtered.filter(animal => animal.category === filters.category);
    }

    if (filters.conservationStatus) {
      filtered = filtered.filter(animal => animal.conservationStatus === filters.conservationStatus);
    }

    if (filters.continent) {
      filtered = filtered.filter(animal => animal.location.continent === filters.continent);
    }

    dispatch({ type: 'SET_FILTERED_ANIMALS', payload: filtered });
  };

  const addFavorite = (animalId: string) => {
    dispatch({ type: 'ADD_FAVORITE', payload: animalId });
  };

  const removeFavorite = (animalId: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: animalId });
  };

  const toggleFavorite = (animalId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: animalId });
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'SET_PREFERENCES', payload: preferences });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const setCurrentPage = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const setBreadcrumbs = (breadcrumbs: { label: string; path: string }[]) => {
    dispatch({ type: 'SET_BREADCRUMBS', payload: breadcrumbs });
  };

  // Fonction pour calculer les statistiques
  const calculateStats = (animals: Animal[]): AnimalStats => {
    const byCategory = animals.reduce((acc, animal) => {
      acc[animal.category] = (acc[animal.category] || 0) + 1;
      return acc;
    }, {} as Record<AnimalCategory, number>);

    const byConservationStatus = animals.reduce((acc, animal) => {
      acc[animal.conservationStatus] = (acc[animal.conservationStatus] || 0) + 1;
      return acc;
    }, {} as Record<ConservationStatus, number>);

    const byContinent = animals.reduce((acc, animal) => {
      acc[animal.location.continent] = (acc[animal.location.continent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAnimals: animals.length,
      byCategory,
      byConservationStatus,
      byContinent,
    };
  };

  // Initialiser les données au montage du composant
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatch({ type: 'SET_ANIMALS', payload: animalsData });
        dispatch({ type: 'SET_STATS', payload: calculateStats(animalsData) });
      } catch (error) {
        setError({
          code: 'INIT_ERROR',
          message: 'Erreur lors de l\'initialisation des données',
          details: error,
          timestamp: Date.now(),
        });
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Mettre à jour les statistiques quand les animaux changent
  useEffect(() => {
    if (state.animals.length > 0) {
      dispatch({ type: 'SET_STATS', payload: calculateStats(state.animals) });
    }
  }, [state.animals]);

  const contextValue: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    setCurrentAnimal,
    searchAnimals,
    filterAnimals,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    updatePreferences,
    resetFilters,
    setCurrentPage,
    setBreadcrumbs,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};