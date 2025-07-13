import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animations
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`;

const wave = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-15px);
  }
`;

const pawPrint = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: scale(1.2) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: scale(0.8) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: scale(1.1) rotate(270deg);
    opacity: 0.8;
  }
`;

// Styled Components
const SpinnerContainer = styled(motion.div)<{ 
  fullscreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  ${props => props.fullscreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 9999;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'width: 24px; height: 24px;';
      case 'large':
        return 'width: 80px; height: 80px;';
      default:
        return 'width: 48px; height: 48px;';
    }
  }}
`;

const CircularSpinner = styled.div<{ 
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent';
}>`
  border-radius: 50%;
  border: 3px solid transparent;
  border-top: 3px solid ${props => {
    switch (props.variant) {
      case 'secondary':
        return props.theme.colors.textSecondary;
      case 'accent':
        return props.theme.colors.accent || '#00d4aa';
      default:
        return props.theme.colors.primary;
    }
  }};
  animation: ${spin} 1s linear infinite;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'width: 20px; height: 20px; border-width: 2px;';
      case 'large':
        return 'width: 60px; height: 60px; border-width: 4px;';
      default:
        return 'width: 40px; height: 40px; border-width: 3px;';
    }
  }}
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Dot = styled.div<{ 
  delay?: number;
  variant?: 'primary' | 'secondary' | 'accent';
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.variant) {
      case 'secondary':
        return props.theme.colors.textSecondary;
      case 'accent':
        return props.theme.colors.accent || '#00d4aa';
      default:
        return props.theme.colors.primary;
    }
  }};
  animation: ${wave} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

const PulseSpinner = styled.div<{ 
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent';
}>`
  border-radius: 50%;
  background: ${props => {
    switch (props.variant) {
      case 'secondary':
        return props.theme.colors.textSecondary;
      case 'accent':
        return props.theme.colors.accent || '#00d4aa';
      default:
        return props.theme.colors.primary;
    }
  }};
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'width: 20px; height: 20px;';
      case 'large':
        return 'width: 60px; height: 60px;';
      default:
        return 'width: 40px; height: 40px;';
    }
  }}
`;

const PawSpinner = styled.div<{ 
  size?: 'small' | 'medium' | 'large';
}>`
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '1.5rem';
      case 'large':
        return '3rem';
      default:
        return '2rem';
    }
  }};
  animation: ${pawPrint} 2s ease-in-out infinite;
  
  &::before {
    content: '🐾';
  }
`;

const LoadingText = styled(motion.p)<{ size?: 'small' | 'medium' | 'large' }>`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-align: center;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'font-size: 0.8rem;';
      case 'large':
        return 'font-size: 1.2rem;';
      default:
        return 'font-size: 1rem;';
    }
  }}
`;

const ProgressBar = styled.div<{ progress?: number }>`
  width: 200px;
  height: 4px;
  background: ${props => props.theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress || 0}%;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

// Types
interface LoadingSpinnerProps {
  type?: 'circular' | 'dots' | 'pulse' | 'paw';
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent';
  fullscreen?: boolean;
  message?: string;
  progress?: number;
  className?: string;
}

// Components
const DotsLoader: React.FC<{ variant?: 'primary' | 'secondary' | 'accent' }> = ({ variant }) => (
  <DotsContainer>
    {[0, 0.2, 0.4].map((delay, index) => (
      <Dot key={index} delay={delay} variant={variant} />
    ))}
  </DotsContainer>
);

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'circular',
  size = 'medium',
  variant = 'primary',
  fullscreen = false,
  message,
  progress,
  className
}) => {
  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader variant={variant} />;
      case 'pulse':
        return <PulseSpinner size={size} variant={variant} />;
      case 'paw':
        return <PawSpinner size={size} />;
      default:
        return <CircularSpinner size={size} variant={variant} />;
    }
  };

  return (
    <SpinnerContainer
      fullscreen={fullscreen}
      size={size}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderSpinner()}
      
      {message && (
        <LoadingText
          size={size}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </LoadingText>
      )}
      
      {typeof progress === 'number' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ProgressBar progress={progress} />
          <LoadingText size="small" style={{ marginTop: '0.5rem' }}>
            {Math.round(progress)}%
          </LoadingText>
        </motion.div>
      )}
    </SpinnerContainer>
  );
};

// Specialized Components
export const CardSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <LoadingSpinner
    type="pulse"
    size="small"
    variant="secondary"
    className={className}
  />
);

export const ButtonSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <LoadingSpinner
    type="circular"
    size="small"
    variant="accent"
    className={className}
  />
);

export const PageLoader: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <LoadingSpinner
    type="paw"
    size="large"
    fullscreen
    message={message}
  />
);

export default LoadingSpinner;
