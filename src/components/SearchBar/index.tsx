import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Animal } from '../../types/Animal';

// Styled Components
const SearchContainer = styled(motion.div)<{ size?: 'small' | 'medium' | 'large' }>`
  position: relative;
  width: 100%;
  max-width: ${props => {
    switch (props.size) {
      case 'small':
        return '250px';
      case 'large':
        return '500px';
      default:
        return '350px';
    }
  }};
`;

const SearchInput = styled.input<{ size?: 'small' | 'medium' | 'large' }>`
  width: 100%;
  padding: ${props => {
    switch (props.size) {
      case 'small':
        return '0.6rem 2.5rem 0.6rem 1rem';
      case 'large':
        return '1rem 3rem 1rem 1.2rem';
      default:
        return '0.8rem 2.8rem 0.8rem 1rem';
    }
  }};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 25px;
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '0.85rem';
      case 'large':
        return '1.1rem';
      default:
        return '0.95rem';
    }
  }};
  font-family: 'Inter', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(241, 104, 58, 0.1);
    background: ${props => props.theme.colors.background};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  position: absolute;
  right: ${props => {
    switch (props.size) {
      case 'small':
        return '0.8rem';
      case 'large':
        return '1.2rem';
      default:
        return '1rem';
    }
  }};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '0.9rem';
      case 'large':
        return '1.3rem';
      default:
        return '1.1rem';
    }
  }};
  pointer-events: none;
`;

const ClearButton = styled(motion.button)<{ size?: 'small' | 'medium' | 'large' }>`
  position: absolute;
  right: ${props => {
    switch (props.size) {
      case 'small':
        return '2.2rem';
      case 'large':
        return '3.2rem';
      default:
        return '2.6rem';
    }
  }};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '0.8rem';
      case 'large':
        return '1.2rem';
      default:
        return '1rem';
    }
  }};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }
`;

const SuggestionsContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
`;

const SuggestionSection = styled.div`
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const SectionTitle = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SuggestionItem = styled(motion.div)<{ isHighlighted?: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${props => props.isHighlighted 
    ? props.theme.colors.background 
    : 'transparent'
  };
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const SuggestionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const SuggestionContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SuggestionTitle = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

const SuggestionSubtitle = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RecentSearches = styled.div`
  padding: 0.5rem 0;
`;

const RecentSearchItem = styled(motion.div)<{ isHighlighted?: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.isHighlighted 
    ? props.theme.colors.background 
    : 'transparent'
  };
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};

  &:hover {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;

const NoResults = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

// Types
interface SearchBarProps {
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

interface Suggestion {
  id: string;
  type: 'animal' | 'category' | 'conservation';
  title: string;
  subtitle?: string;
  icon: string;
  data?: any;
}

// Component
const SearchBar: React.FC<SearchBarProps> = ({
  size = 'medium',
  placeholder = 'Search wildlife...',
  className,
  onSearch
}) => {
  const navigate = useNavigate();
  const { animals } = useAppContext();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wildlife-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('wildlife-recent-searches', JSON.stringify(updated));
  };

  // Generate suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const newSuggestions: Suggestion[] = [];

    // Animal suggestions
    const animalMatches = animals
      .filter(animal => 
        animal.name.toLowerCase().includes(searchQuery) ||
        animal.species.toLowerCase().includes(searchQuery) ||
        animal.habitat.toLowerCase().includes(searchQuery)
      )
      .slice(0, 5)
      .map(animal => ({
        id: `animal-${animal.id}`,
        type: 'animal' as const,
        title: animal.name,
        subtitle: `${animal.species} • ${animal.habitat}`,
        icon: animal.emoji || '🦁',
        data: animal
      }));

    newSuggestions.push(...animalMatches);

    // Category suggestions
    const categories = ['Mammals', 'Birds', 'Reptiles', 'Marine Life', 'Insects'];
    const categoryMatches = categories
      .filter(category => category.toLowerCase().includes(searchQuery))
      .slice(0, 3)
      .map(category => ({
        id: `category-${category}`,
        type: 'category' as const,
        title: category,
        subtitle: 'Animal category',
        icon: '📂',
        data: { category }
      }));

    newSuggestions.push(...categoryMatches);

    // Conservation status suggestions
    const conservationStatuses = ['Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'];
    const statusMatches = conservationStatuses
      .filter(status => status.toLowerCase().includes(searchQuery))
      .slice(0, 2)
      .map(status => ({
        id: `status-${status}`,
        type: 'conservation' as const,
        title: status,
        subtitle: 'Conservation status',
        icon: '🛡️',
        data: { status }
      }));

    newSuggestions.push(...statusMatches);

    setSuggestions(newSuggestions);
    setHighlightedIndex(-1);
  }, [query, animals]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    saveRecentSearch(finalQuery);
    setShowSuggestions(false);
    setQuery('');
    
    onSearch?.(finalQuery);
    navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setShowSuggestions(false);
    setQuery('');
    
    switch (suggestion.type) {
      case 'animal':
        navigate(`/animal/${suggestion.data.id}`);
        break;
      case 'category':
        navigate(`/category/${suggestion.data.category.toLowerCase()}`);
        break;
      case 'conservation':
        navigate(`/conservation/${suggestion.data.status.toLowerCase().replace(' ', '-')}`);
        break;
    }
    
    saveRecentSearch(suggestion.title);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const totalItems = suggestions.length + (recentSearches.length > 0 ? recentSearches.length : 0);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : -1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > -1 ? prev - 1 : totalItems - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex === -1) {
          handleSearch();
        } else if (highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        } else {
          const recentIndex = highlightedIndex - suggestions.length;
          if (recentSearches[recentIndex]) {
            setQuery(recentSearches[recentIndex]);
            handleSearch(recentSearches[recentIndex]);
          }
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const showRecentSearches = showSuggestions && !query.trim() && recentSearches.length > 0;
  const showSuggestionsPanel = showSuggestions && (suggestions.length > 0 || showRecentSearches);

  return (
    <SearchContainer
      ref={containerRef}
      size={size}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SearchInput
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        size={size}
      />
      
      {query && (
        <ClearButton
          size={size}
          onClick={clearSearch}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          ✕
        </ClearButton>
      )}
      
      <SearchIcon size={size}>🔍</SearchIcon>

      <AnimatePresence>
        {showSuggestionsPanel && (
          <SuggestionsContainer
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.length > 0 && (
              <SuggestionSection>
                <SectionTitle>Search Results</SectionTitle>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={suggestion.id}
                    isHighlighted={index === highlightedIndex}
                    onClick={() => handleSuggestionClick(suggestion)}
                    whileHover={{ x: 5 }}
                  >
                    <SuggestionIcon>{suggestion.icon}</SuggestionIcon>
                    <SuggestionContent>
                      <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                      {suggestion.subtitle && (
                        <SuggestionSubtitle>{suggestion.subtitle}</SuggestionSubtitle>
                      )}
                    </SuggestionContent>
                  </SuggestionItem>
                ))}
              </SuggestionSection>
            )}

            {showRecentSearches && (
              <RecentSearches>
                <SectionTitle>Recent Searches</SectionTitle>
                {recentSearches.map((search, index) => {
                  const adjustedIndex = suggestions.length + index;
                  return (
                    <RecentSearchItem
                      key={search}
                      isHighlighted={adjustedIndex === highlightedIndex}
                      onClick={() => {
                        setQuery(search);
                        handleSearch(search);
                      }}
                      whileHover={{ x: 5 }}
                    >
                      🕒 {search}
                    </RecentSearchItem>
                  );
                })}
              </RecentSearches>
            )}

            {suggestions.length === 0 && !showRecentSearches && query.trim() && (
              <NoResults>
                No results found for "{query}"
              </NoResults>
            )}
          </SuggestionsContainer>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default SearchBar;
