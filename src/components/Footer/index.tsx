import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

// Styled Components
const FooterContainer = styled(motion.footer)`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.surface} 0%,
    ${props => props.theme.colors.background} 100%
  );
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 4rem 2rem 2rem;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => props.theme.colors.primary},
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(5px);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

const ExternalLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(5px);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(241, 104, 58, 0.3);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(241, 104, 58, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const NewsletterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(241, 104, 58, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const FooterStats = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-family: 'Poppins', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const LogoText = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-family: 'Poppins', sans-serif;
`;

// Component
const Footer: React.FC = () => {
  const { favorites, animals } = useAppContext();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setSubscriptionMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionMessage(''), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <FooterContainer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <FooterContent>
        <FooterSection variants={itemVariants}>
          <Logo
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <LogoIcon>🦁</LogoIcon>
            <LogoText>WildLife Pro</LogoText>
          </Logo>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.9rem', 
            lineHeight: '1.6',
            margin: 0
          }}>
            Discover the amazing world of wildlife through our interactive slider experience. 
            Learn about endangered species and help protect our planet's biodiversity.
          </p>
          <SocialLinks>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              📘
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🐦
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              📷
            </SocialLink>
            <SocialLink
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              📺
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <SectionTitle>Explore</SectionTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/animals">All Animals</FooterLink>
          <FooterLink to="/categories">Categories</FooterLink>
          <FooterLink to="/conservation">Conservation</FooterLink>
          <FooterLink to="/favorites">My Favorites</FooterLink>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <SectionTitle>Learn More</SectionTitle>
          <ExternalLink href="https://www.worldwildlife.org" target="_blank" rel="noopener noreferrer">
            World Wildlife Fund
          </ExternalLink>
          <ExternalLink href="https://www.nationalgeographic.com/animals" target="_blank" rel="noopener noreferrer">
            National Geographic
          </ExternalLink>
          <ExternalLink href="https://www.iucnredlist.org" target="_blank" rel="noopener noreferrer">
            IUCN Red List
          </ExternalLink>
          <ExternalLink href="https://www.conservation.org" target="_blank" rel="noopener noreferrer">
            Conservation International
          </ExternalLink>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <SectionTitle>Stay Updated</SectionTitle>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.9rem', 
            margin: '0 0 1rem 0'
          }}>
            Subscribe to our newsletter for the latest wildlife news and updates.
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <NewsletterButton
              type="submit"
              disabled={isSubscribing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </NewsletterButton>
          </NewsletterForm>
          {subscriptionMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: subscriptionMessage.includes('Thank you') 
                  ? 'var(--success-color, #4caf50)' 
                  : 'var(--error-color, #f44336)',
                fontSize: '0.8rem',
                margin: '0.5rem 0 0 0'
              }}
            >
              {subscriptionMessage}
            </motion.p>
          )}
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © 2024 WildLife Pro. All rights reserved. Made with ❤️ for wildlife conservation.
        </Copyright>
        
        <FooterStats>
          <Stat>
            <StatNumber>{animals.length}</StatNumber>
            <StatLabel>Species</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{favorites.length}</StatNumber>
            <StatLabel>Favorites</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>10K+</StatNumber>
            <StatLabel>Views</StatLabel>
          </Stat>
        </FooterStats>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
