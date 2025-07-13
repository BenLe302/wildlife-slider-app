import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Animal } from '../../types/Animal';

// Animations
const heartBeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(1.1);
  }
`;

const pulseRing = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

const sparkle = keyframes`
  0%, 100% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 1;
  }
`;

const floatUp = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px) scale(0.5);
    opacity: 0;
  }
`;

// Styled Components
const FavoriteContainer = styled(motion.div)<{ size?: 'small' | 'medium' | 'large' }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'width: 32px; height: 32px;';
      case 'large':
        return 'width: 56px; height: 56px;';
      default:
        return 'width: 44px; height: 44px;';
    }
  }}
`;

const HeartButton = styled(motion.button)<{ 
  isFavorite?: boolean; 
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outline' | 'minimal';
}>`
  background: ${props => {
    if (props.variant === 'minimal') return 'transparent';
    if (props.variant === 'outline') {
      return props.isFavorite 
        ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
        : 'transparent';
    }
    return props.isFavorite 
      ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
      : 'rgba(255, 255, 255, 0.1)';
  }};
  
  border: ${props => {
    if (props.variant === 'minimal') return 'none';
    if (props.variant === 'outline') {
      return props.isFavorite 
        ? 'none'
        : '2px solid rgba(255, 107, 107, 0.5)';
    }
    return 'none';
  }};
  
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: visible;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'font-size: 14px;';
      case 'large':
        return 'font-size: 24px;';
      default:
        return 'font-size: 18px;';
    }
  }}

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.3);
  }
`;

const HeartIcon = styled(motion.span)<{ isFavorite?: boolean }>`
  color: ${props => props.isFavorite ? '#fff' : '#ff6b6b'};
  font-size: inherit;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: ${props => props.isFavorite ? '"❤️"' : '"🤍"'};
  }
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 2px solid #ff6b6b;
  border-radius: 50%;
  pointer-events: none;
  animation: ${pulseRing} 0.6s ease-out;
`;

const SparkleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Sparkle = styled(motion.div)<{ delay?: number }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
  animation: ${sparkle} 0.8s ease-out;
  animation-delay: ${props => props.delay || 0}s;
  
  &:nth-child(1) { top: 10%; left: 50%; }
  &:nth-child(2) { top: 50%; right: 10%; }
  &:nth-child(3) { bottom: 10%; left: 50%; }
  &:nth-child(4) { top: 50%; left: 10%; }
  &:nth-child(5) { top: 20%; right: 20%; }
  &:nth-child(6) { bottom: 20%; left: 20%; }
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #ff6b6b;
  pointer-events: none;
  animation: ${floatUp} 1s ease-out forwards;
  
  &::before {
    content: '❤️';
  }
`;

const FavoriteCount = styled(motion.span)<{ size?: 'small' | 'medium' | 'large' }>`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'min-width: 16px; height: 16px; font-size: 8px; top: -6px; right: -6px;';
      case 'large':
        return 'min-width: 24px; height: 24px; font-size: 12px; top: -10px; right: -10px;';
      default:
        return '';
    }
  }}
`;

// Types
interface FavoriteButtonProps {
  animal: Animal;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outline' | 'minimal';
  showCount?: boolean;
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

// Component
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  animal,
  size = 'medium',
  variant = 'filled',
  showCount = false,
  className,
  onToggle
}) => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  
  const isFavorite = favorites.some(fav => fav.id === animal.id);
  const favoriteCount = favorites.length;

  const handleToggle = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    try {
      if (isFavorite) {
        await removeFromFavorites(animal.id);
      } else {
        await addToFavorites(animal);
        // Trigger celebration animations
        setShowPulse(true);
        setShowSparkles(true);
        setShowFloatingHeart(true);
        
        // Reset animations
        setTimeout(() => {
          setShowPulse(false);
          setShowSparkles(false);
          setShowFloatingHeart(false);
        }, 1000);
      }
      
      onToggle?.(isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <FavoriteContainer
      size={size}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <HeartButton
        isFavorite={isFavorite}
        size={size}
        variant={variant}
        onClick={handleToggle}
        disabled={isAnimating}
        animate={{
          scale: isAnimating ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <HeartIcon
          isFavorite={isFavorite}
          animate={{
            scale: isFavorite && isAnimating ? [1, 1.3, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulse Ring Animation */}
        <AnimatePresence>
          {showPulse && (
            <PulseRing
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
        
        {/* Sparkles Animation */}
        <AnimatePresence>
          {showSparkles && (
            <SparkleContainer>
              {[...Array(6)].map((_, i) => (
                <Sparkle
                  key={i}
                  delay={i * 0.1}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1, 0], rotate: 180 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}
            </SparkleContainer>
          )}
        </AnimatePresence>
        
        {/* Floating Heart Animation */}
        <AnimatePresence>
          {showFloatingHeart && (
            <FloatingHeart
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={{ y: -50, scale: 0.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </HeartButton>
      
      {/* Favorite Count Badge */}
      {showCount && favoriteCount > 0 && (
        <FavoriteCount
          size={size}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        >
          {favoriteCount > 99 ? '99+' : favoriteCount}
        </FavoriteCount>
      )}
    </FavoriteContainer>
  );
};

export default FavoriteButton;
