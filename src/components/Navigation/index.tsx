import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import ThemeToggle from '../ThemeToggle';
import FavoriteButton from '../FavoriteButton';

// Styled Components
const NavigationContainer = styled(motion.nav)<{ isScrolled?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled 
    ? `rgba(${props.theme.colors.surface.replace(/[^\d,]/g, '')}, 0.95)` 
    : 'transparent'
  };
  backdrop-filter: ${props => props.isScrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.isScrolled 
    ? `1px solid ${props.theme.colors.border}` 
    : 'none'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(241, 104, 58, 0.3);

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  text-decoration: none;
  color: ${props => props.isActive 
    ? props.theme.colors.primary 
    : props.theme.colors.textSecondary
  };
  font-weight: ${props => props.isActive ? '600' : '500'};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled(motion.div)`
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FavoriteCounter = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 20px;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0 0 15px 15px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MobileNavLink = styled(Link)<{ isActive?: boolean }>`
  text-decoration: none;
  color: ${props => props.isActive 
    ? props.theme.colors.primary 
    : props.theme.colors.text
  };
  font-weight: ${props => props.isActive ? '600' : '500'};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: ${props => props.isActive 
    ? 'rgba(241, 104, 58, 0.1)' 
    : 'transparent'
  };
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileSearchContainer = styled.div`
  margin-bottom: 1rem;
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

// Component
const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/animals', label: 'Animals' },
    { path: '/categories', label: 'Categories' },
    { path: '/conservation', label: 'Conservation' },
    { path: '/about', label: 'About' }
  ];

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  return (
    <NavigationContainer
      isScrolled={isScrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <NavContent>
        <Logo to="/">
          <LogoIcon>🦁</LogoIcon>
          <span>WildLife Pro</span>
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <NavActions>
          <SearchContainer
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SearchBar size="small" />
          </SearchContainer>

          {favorites.length > 0 && (
            <FavoriteCounter
              onClick={handleFavoritesClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
            >
              ❤️ {favorites.length}
            </FavoriteCounter>
          )}

          <ThemeToggle />

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </NavActions>
      </NavContent>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileSearchContainer>
              <SearchBar size="medium" placeholder="Search animals..." />
            </MobileSearchContainer>

            <MobileNavLinks>
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.path}
                  to={item.path}
                  isActive={location.pathname === item.path}
                >
                  {item.label}
                </MobileNavLink>
              ))}
              <MobileNavLink
                to="/favorites"
                isActive={location.pathname === '/favorites'}
              >
                Favorites {favorites.length > 0 && `(${favorites.length})`}
              </MobileNavLink>
            </MobileNavLinks>

            <MobileActions>
              <span style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.9rem' 
              }}>
                Theme
              </span>
              <ThemeToggle />
            </MobileActions>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default Navigation;
