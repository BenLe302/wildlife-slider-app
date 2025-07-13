import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.primary};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    position: relative;
  }

  /* Scrollbar personnalisée */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  /* Sélection de texte */
  ::selection {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }

  /* Focus outline personnalisé */
  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  /* Animations globales */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  /* Classes utilitaires */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-in-left {
    animation: slideInFromLeft 0.6s ease-out;
  }

  .slide-in-right {
    animation: slideInFromRight 0.6s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  .shimmer {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background.secondary} 0px,
      ${({ theme }) => theme.colors.background.tertiary} 40px,
      ${({ theme }) => theme.colors.background.secondary} 80px
    );
    background-size: 200px;
    animation: shimmer 1.5s infinite;
  }

  /* Responsive breakpoints */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .container-fluid {
    width: 100%;
    padding: 0 20px;
  }

  /* Grid system */
  .grid {
    display: grid;
    gap: 20px;
  }

  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    .grid-2,
    .grid-3,
    .grid-4 {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1024px) {
    .grid-4 {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid-3 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Flexbox utilities */
  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  /* Text utilities */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Spacing utilities */
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mt-5 { margin-top: 3rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  .mb-5 { margin-bottom: 3rem; }

  .pt-1 { padding-top: 0.5rem; }
  .pt-2 { padding-top: 1rem; }
  .pt-3 { padding-top: 1.5rem; }
  .pt-4 { padding-top: 2rem; }
  .pt-5 { padding-top: 3rem; }

  .pb-1 { padding-bottom: 0.5rem; }
  .pb-2 { padding-bottom: 1rem; }
  .pb-3 { padding-bottom: 1.5rem; }
  .pb-4 { padding-bottom: 2rem; }
  .pb-5 { padding-bottom: 3rem; }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    img {
      max-width: 100% !important;
    }

    @page {
      margin: 0.5cm;
    }
  }
`;