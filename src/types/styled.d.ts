import 'styled-components';
import { theme } from '../styles/theme';

// Étendre l'interface DefaultTheme de styled-components
// avec notre thème personnalisé
declare module 'styled-components' {
  type Theme = typeof theme;
  
  export interface DefaultTheme extends Theme {}
}