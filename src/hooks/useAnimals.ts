import { useState, useEffect, useCallback } from 'react';
import { Animal, AnimalCategory, ConservationStatus, FilterOptions, AnimalStats, AppError } from '../types';
import { animalsData, getAnimalById, searchAnimals as searchAnimalsData } from '../data/animals';

// Hook pour gérer les animaux
export const useAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  // Charger les données initiales
  const loadAnimals = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un délai de chargement d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAnimals(animalsData);
      setFilteredAnimals(animalsData);
    } catch (err) {
      setError({
        code: 'LOAD_ERROR',
        message: 'Erreur lors du chargement des animaux',
        details: err,
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Rechercher des animaux
  const searchAnimals = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredAnimals(animals);
      return;
    }

    const results = searchAnimalsData(searchTerm);
    setFilteredAnimals(results);
  }, [animals]);

  // Filtrer les animaux
  const filterAnimals = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    let filtered = [...animals];

    if (newFilters.category) {
      filtered = filtered.filter(animal => animal.category === newFilters.category);
    }

    if (newFilters.conservationStatus) {
      filtered = filtered.filter(animal => animal.conservationStatus === newFilters.conservationStatus);
    }

    if (newFilters.continent) {
      filtered = filtered.filter(animal => animal.location.continent === newFilters.continent);
    }

    if (newFilters.searchTerm) {
      filtered = searchAnimalsData(newFilters.searchTerm).filter(animal => 
        filtered.some(f => f.id === animal.id)
      );
    }

    setFilteredAnimals(filtered);
  }, [animals]);

  // Réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setFilters({});
    setFilteredAnimals(animals);
  }, [animals]);

  // Obtenir un animal par ID
  const getAnimal = useCallback((id: string) => {
    return getAnimalById(id);
  }, []);

  // Charger les données au montage
  useEffect(() => {
    loadAnimals();
  }, [loadAnimals]);

  return {
    animals: filteredAnimals,
    allAnimals: animals,
    loading,
    error,
    filters,
    searchAnimals,
    filterAnimals,
    resetFilters,
    getAnimal,
    refreshData: loadAnimals,
  };
};

// Hook pour obtenir un animal spécifique
export const useAnimal = (id: string) => {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadAnimal = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundAnimal = getAnimalById(id);
        if (foundAnimal) {
          setAnimal(foundAnimal);
        } else {
          setError({
            code: 'NOT_FOUND',
            message: `Animal avec l'ID ${id} non trouvé`,
            timestamp: Date.now(),
          });
        }
      } catch (err) {
        setError({
          code: 'FETCH_ERROR',
          message: 'Erreur lors du chargement de l\'animal',
          details: err,
          timestamp: Date.now(),
        });
      } finally {
        setLoading(false);
      }
    };

    loadAnimal();
  }, [id]);

  return { animal, loading, error };
};

// Hook pour les statistiques des animaux
export const useAnimalStats = () => {
  const [stats, setStats] = useState<AnimalStats | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateStats = useCallback(() => {
    setLoading(true);
    
    try {
      const byCategory = animalsData.reduce((acc, animal) => {
        acc[animal.category] = (acc[animal.category] || 0) + 1;
        return acc;
      }, {} as Record<AnimalCategory, number>);

      const byConservationStatus = animalsData.reduce((acc, animal) => {
        acc[animal.conservationStatus] = (acc[animal.conservationStatus] || 0) + 1;
        return acc;
      }, {} as Record<ConservationStatus, number>);

      const byContinent = animalsData.reduce((acc, animal) => {
        acc[animal.location.continent] = (acc[animal.location.continent] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setStats({
        totalAnimals: animalsData.length,
        byCategory,
        byConservationStatus,
        byContinent,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  return { stats, loading, refreshStats: calculateStats };
};

// Hook pour obtenir des animaux similaires
export const useSimilarAnimals = (currentAnimal: Animal | null, limit: number = 3) => {
  const [similarAnimals, setSimilarAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    if (!currentAnimal) {
      setSimilarAnimals([]);
      return;
    }

    // Trouver des animaux similaires basés sur la catégorie, le continent ou le statut de conservation
    const similar = animalsData
      .filter(animal => animal.id !== currentAnimal.id)
      .filter(animal => 
        animal.category === currentAnimal.category ||
        animal.location.continent === currentAnimal.location.continent ||
        animal.conservationStatus === currentAnimal.conservationStatus
      )
      .slice(0, limit);

    setSimilarAnimals(similar);
  }, [currentAnimal, limit]);

  return similarAnimals;
};