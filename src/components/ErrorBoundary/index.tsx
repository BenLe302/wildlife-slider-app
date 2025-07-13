import React, { Component, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const ErrorContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.background} 0%,
    ${props => props.theme.colors.surface} 100%
  );
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23000" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
    pointer-events: none;
  }
`;

const ErrorCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const ErrorIcon = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  animation: ${shake} 0.8s ease-in-out;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);

  &::before {
    content: '⚠️';
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ErrorDetails = styled.details`
  margin: 2rem 0;
  text-align: left;
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
    user-select: none;

    &:hover {
      color: ${props => props.theme.colors.primaryHover};
    }
  }

  pre {
    background: ${props => props.theme.colors.surface};
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
    margin-top: 0.5rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  min-width: 140px;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primaryHover});
    color: white;
    box-shadow: 0 4px 15px rgba(241, 104, 58, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(241, 104, 58, 0.4);
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.text};
    border: 2px solid ${props.theme.colors.border};

    &:hover {
      background: ${props.theme.colors.surface};
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(241, 104, 58, 0.1), rgba(238, 90, 36, 0.05));
    animation: ${pulse} 4s ease-in-out infinite;
  }

  &::before {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  &::after {
    bottom: 10%;
    right: 10%;
    animation-delay: 2s;
  }
`;

// Types
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// Component
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FloatingElements />
          <ErrorCard
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ErrorIcon
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4,
                type: "spring",
                stiffness: 200
              }}
            />
            
            <ErrorTitle>Oops! Something went wrong</ErrorTitle>
            
            <ErrorMessage>
              We're sorry, but something unexpected happened. 
              Don't worry, our team has been notified and we're working on a fix.
            </ErrorMessage>

            {this.state.error && (
              <ErrorDetails>
                <summary>Technical Details</summary>
                <pre>
                  <strong>Error:</strong> {this.state.error.message}
                  {this.state.errorInfo && (
                    <>
                      <br /><br />
                      <strong>Component Stack:</strong>
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </ErrorDetails>
            )}

            <ActionButtons>
              <ActionButton
                variant="primary"
                onClick={this.handleReload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Reload Page
              </ActionButton>
              
              <ActionButton
                variant="secondary"
                onClick={this.handleGoHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Go Home
              </ActionButton>
            </ActionButtons>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
