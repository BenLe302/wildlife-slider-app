import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes for animations
export const fadeInContent = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInImage = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInThumbnails = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Main container
export const CarouselContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`;

// Slides container
export const SlidesList = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

// Individual slide
export const SlideItem = styled(motion.div)<{ isActive?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: ${props => props.isActive ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background}dd,
    ${props => props.theme.colors.surface}dd
  );
  backdrop-filter: blur(10px);
`;

// Slide image
export const SlideImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  animation: ${fadeInImage} 1s ease-out;
  filter: brightness(0.7) contrast(1.1);
  transition: all 0.8s ease;
`;

// Content container
export const SlideContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
  text-align: center;
  animation: ${fadeInContent} 1s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1rem;
  }
`;

// Author/photographer
export const SlideAuthor = styled(motion.div)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
  opacity: 0.9;
  animation: ${slideInUp} 0.8s ease-out 0.5s both;
  
  &::before {
    content: '📸 ';
    margin-right: 0.5rem;
  }
`;

// Main title
export const SlideTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${slideInLeft} 1s ease-out 0.4s both;
  font-family: 'Poppins', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// Subject/species
export const SlideSubject = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1.5rem 0;
  animation: ${slideInRight} 1s ease-out 0.6s both;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

// Description
export const SlideDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${slideInUp} 1s ease-out 0.8s both;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

// Action buttons container
export const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  animation: ${slideInUp} 1s ease-out 1s both;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

// Action button
export const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primaryHover});
    color: white;
    box-shadow: 0 4px 15px rgba(241, 104, 58, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(241, 104, 58, 0.4);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: ${props.theme.colors.text};
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }
`;

// Thumbnails container
export const ThumbnailContainer = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
  animation: ${fadeInThumbnails} 1s ease-out 1.2s both;
  
  @media (max-width: 768px) {
    bottom: 1rem;
    gap: 0.5rem;
    max-width: 90%;
    overflow-x: auto;
    padding: 0 1rem;
  }
`;

// Individual thumbnail
export const ThumbnailItem = styled(motion.div)<{ isActive?: boolean }>`
  position: relative;
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.isActive 
    ? props.theme.colors.primary 
    : 'transparent'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.theme.colors.surface};
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 45px;
    flex-shrink: 0;
  }
`;

// Thumbnail image
export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${ThumbnailItem}:hover & {
    transform: scale(1.1);
  }
`;

// Thumbnail content overlay
export const ThumbnailContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 0.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ThumbnailItem}:hover & {
    transform: translateY(0);
  }
`;

// Thumbnail title
export const ThumbnailTitle = styled.div`
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
`;

// Navigation container
export const NavigationContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 10;
  pointer-events: none;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

// Navigation button
export const NavigationButton = styled(motion.button)<{ direction?: 'prev' | 'next' }>`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  pointer-events: auto;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

// Progress bar
export const ProgressBar = styled(motion.div)<{ progress?: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.progress || 0}%;
  transition: width 0.3s ease;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.primary});
    transform: translateX(100%);
  }
`;

// Overlay for better text readability
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
`;

// Slide indicators
export const SlideIndicators = styled(motion.div)`
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    bottom: 4rem;
  }
`;

// Individual indicator
export const Indicator = styled(motion.div)<{ isActive?: boolean }>`
  width: ${props => props.isActive ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${props => props.isActive 
    ? props.theme.colors.primary 
    : 'rgba(255, 255, 255, 0.4)'
  };
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: ${props => props.isActive 
      ? props.theme.colors.primaryHover 
      : 'rgba(255, 255, 255, 0.6)'
    };
    transform: scale(1.2);
  }
`;

// Loading state
export const LoadingContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
  z-index: 100;
`;

// Error state
export const ErrorContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  text-align: center;
  padding: 2rem;
  z-index: 100;
`;

export const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

export const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 500px;
`;

export const RetryButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(241, 104, 58, 0.4);
  }
`;
