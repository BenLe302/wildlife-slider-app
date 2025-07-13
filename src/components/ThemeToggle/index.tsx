import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Animations
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const drift = keyframes`
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0px);
  }
`;

// Styled Components
const ToggleContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const ToggleButton = styled(motion.div)<{ isDark?: boolean }>`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #1a1a2e, #16213e)' 
    : 'linear-gradient(135deg, #87ceeb, #98d8e8)'
  };
  border-radius: 15px;
  border: 2px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'
  };
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: ${props => props.isDark 
    ? '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(255, 255, 255, 0.1)' 
    : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.8)'
  };

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.isDark 
      ? '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.15)' 
      : '0 6px 20px rgba(0, 0, 0, 0.15), inset 0 2px 5px rgba(255, 255, 255, 0.9)'
    };
  }
`;

const ToggleTrack = styled.div<{ isDark?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #0f0f23, #1a1a2e)' 
    : 'linear-gradient(135deg, #87ceeb, #b0e0e6)'
  };
  transition: all 0.4s ease;
`;

const ToggleThumb = styled(motion.div)<{ isDark?: boolean }>`
  position: absolute;
  top: 2px;
  left: ${props => props.isDark ? '32px' : '2px'};
  width: 24px;
  height: 24px;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #f4f4f4, #ffffff)' 
    : 'linear-gradient(135deg, #ffd700, #ffed4e)'
  };
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: ${props => props.isDark 
    ? '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.8)' 
    : '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
  };
  
  &::before {
    content: '${props => props.isDark ? '🌙' : '☀️'}';
    animation: ${props => props.isDark ? 'none' : rotate} 8s linear infinite;
  }
`;

const Stars = styled.div<{ isDark?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => props.isDark ? 1 : 0};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const Star = styled.div<{ top?: string; left?: string; delay?: string }>`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${twinkle} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  box-shadow: 0 0 4px #ffffff;
`;

const Clouds = styled.div<{ isDark?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => props.isDark ? 0 : 1};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const Cloud = styled.div<{ top?: string; left?: string; size?: string }>`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  width: ${props => props.size || '8px'};
  height: ${props => props.size || '8px'};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: ${drift} 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -2px;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
  }
`;

const TooltipContainer = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  pointer-events: none;
`;

const Tooltip = styled.div`
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${props => props.theme.colors.surface};
  }
`;

// Component
const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <ToggleContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ToggleButton
        isDark={isDarkMode}
        onClick={handleToggle}
        layout
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <ToggleTrack isDark={isDarkMode} />
        
        <Stars isDark={isDarkMode}>
          <Star top="20%" left="15%" delay="0s" />
          <Star top="60%" left="20%" delay="0.5s" />
          <Star top="30%" left="80%" delay="1s" />
          <Star top="70%" left="75%" delay="1.5s" />
        </Stars>
        
        <Clouds isDark={isDarkMode}>
          <Cloud top="25%" left="20%" size="6px" />
          <Cloud top="60%" left="70%" size="4px" />
          <Cloud top="40%" left="85%" size="5px" />
        </Clouds>
        
        <ToggleThumb
          isDark={isDarkMode}
          layout
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </ToggleButton>
      
      <AnimatePresence>
        {showTooltip && (
          <TooltipContainer
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Tooltip>
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </Tooltip>
          </TooltipContainer>
        )}
      </AnimatePresence>
    </ToggleContainer>
  );
};

export default ThemeToggle;
