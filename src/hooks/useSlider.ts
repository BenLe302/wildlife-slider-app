import { useState, useEffect, useCallback, useRef } from 'react';
import { SliderSettings, SliderState } from '../types';

// Configuration par défaut du slider
const defaultSettings: SliderSettings = {
  autoPlay: true,
  autoPlayInterval: 5000,
  showThumbnails: true,
  showProgressBar: true,
  enableKeyboardNavigation: true,
  enableMouseWheel: false,
  transitionDuration: 500,
  pauseOnHover: true,
};

// Hook personnalisé pour gérer la logique du slider
export const useSlider = (
  itemsCount: number,
  settings: Partial<SliderSettings> = {}
) => {
  const config = { ...defaultSettings, ...settings };
  
  // État du slider
  const [state, setState] = useState<SliderState>({
    currentIndex: 0,
    isAnimating: false,
    direction: 'next',
    isPaused: false,
  });

  // Références pour les timers
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(true);

  // Fonction pour démarrer l'autoplay
  const startAutoPlay = useCallback(() => {
    if (!config.autoPlay || state.isPaused || !isVisibleRef.current) return;
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      setState(prevState => {
        if (prevState.isAnimating || prevState.isPaused) return prevState;
        
        const nextIndex = (prevState.currentIndex + 1) % itemsCount;
        return {
          ...prevState,
          currentIndex: nextIndex,
          direction: 'next',
          isAnimating: true,
        };
      });
    }, config.autoPlayInterval);
  }, [config.autoPlay, config.autoPlayInterval, state.isPaused, itemsCount]);

  // Fonction pour aller à un slide spécifique
  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= itemsCount || state.isAnimating) return;
    
    setState(prevState => ({
      ...prevState,
      currentIndex: index,
      direction: index > prevState.currentIndex ? 'next' : 'prev',
      isAnimating: true,
    }));
  }, [itemsCount, state.isAnimating]);

  // Fonction pour aller au slide suivant
  const nextSlide = useCallback(() => {
    if (state.isAnimating) return;
    
    const nextIndex = (state.currentIndex + 1) % itemsCount;
    goToSlide(nextIndex);
  }, [state.currentIndex, state.isAnimating, itemsCount, goToSlide]);

  // Fonction pour aller au slide précédent
  const prevSlide = useCallback(() => {
    if (state.isAnimating) return;
    
    const prevIndex = state.currentIndex === 0 ? itemsCount - 1 : state.currentIndex - 1;
    goToSlide(prevIndex);
  }, [state.currentIndex, state.isAnimating, itemsCount, goToSlide]);

  // Fonction pour mettre en pause
  const pause = useCallback(() => {
    setState(prevState => ({ ...prevState, isPaused: true }));
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Fonction pour reprendre
  const resume = useCallback(() => {
    setState(prevState => ({ ...prevState, isPaused: false }));
  }, []);

  // Fonction pour réinitialiser le slider
  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      isAnimating: false,
      direction: 'next',
      isPaused: false,
    });
  }, []);

  // Gestion de la navigation au clavier
  useEffect(() => {
    if (!config.enableKeyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          if (state.isPaused) {
            resume();
          } else {
            pause();
          }
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(itemsCount - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [config.enableKeyboardNavigation, prevSlide, nextSlide, state.isPaused, pause, resume, goToSlide, itemsCount]);

  // Gestion de la visibilité de la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (document.hidden) {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
          autoPlayRef.current = null;
        }
      } else if (config.autoPlay && !state.isPaused) {
        startAutoPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [config.autoPlay, state.isPaused, startAutoPlay]);

  // Démarrer/redémarrer l'autoplay quand nécessaire
  useEffect(() => {
    if (config.autoPlay && !state.isPaused && isVisibleRef.current) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [config.autoPlay, state.isPaused, startAutoPlay]);

  // Gérer la fin de l'animation
  useEffect(() => {
    if (state.isAnimating) {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      
      animationRef.current = setTimeout(() => {
        setState(prevState => ({ ...prevState, isAnimating: false }));
      }, config.transitionDuration);
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [state.isAnimating, config.transitionDuration]);

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return {
    currentIndex: state.currentIndex,
    isAnimating: state.isAnimating,
    direction: state.direction,
    isPaused: state.isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
    reset,
    settings: config,
  };
};