# Wildlife Slider App

Une application React moderne présentant la faune sauvage à travers un slider interactif et immersif.

## 🌟 Fonctionnalités

- **Slider interactif** avec navigation automatique et manuelle
- **Galerie d'animaux** avec informations détaillées
- **Système de recherche et filtrage** avancé
- **Favoris** pour sauvegarder vos animaux préférés
- **Statistiques** sur la conservation et la biodiversité
- **Design responsive** adapté à tous les écrans
- **Animations fluides** avec Framer Motion et GSAP
- **Thème sombre/clair** personnalisable

## 🚀 Technologies utilisées

- **React 18** avec TypeScript
- **Styled-Components** pour le styling
- **React Router** pour la navigation
- **Framer Motion** pour les animations
- **GSAP** pour les animations avancées
- **Context API** pour la gestion d'état
- **Hooks personnalisés** pour la logique réutilisable

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header/
│   ├── Navigation/
│   ├── Footer/
│   ├── Slider/
│   ├── AnimalCard/
│   ├── SearchBar/
│   ├── LoadingSpinner/
│   ├── ErrorBoundary/
│   ├── ThemeToggle/
│   └── styled/          # Composants stylisés
├── pages/               # Pages de l'application
│   ├── Home/
│   ├── Gallery/
│   ├── AnimalDetail/
│   ├── Search/
│   ├── Favorites/
│   ├── Conservation/
│   ├── Statistics/
│   ├── About/
│   ├── Contact/
│   └── NotFound/
├── context/             # Contexte React
│   └── AppContext.tsx
├── hooks/               # Hooks personnalisés
│   ├── useAnimals.ts
│   └── useSlider.ts
├── data/                # Données statiques
│   └── animals.ts
├── types/               # Types TypeScript
│   ├── index.ts
│   └── styled.d.ts
├── styles/              # Styles globaux et thème
│   ├── GlobalStyles.ts
│   └── theme.ts
├── App.tsx
└── index.tsx
```

## 🛠️ Installation et démarrage

1. **Cloner le repository**
   ```bash
   git clone https://github.com/BenLe302/wildlife-slider-app.git
   cd wildlife-slider-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application**
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**
   L'application sera disponible sur `http://localhost:3000`

## 📱 Scripts disponibles

- `npm start` - Démarre l'application en mode développement
- `npm build` - Construit l'application pour la production
- `npm test` - Lance les tests
- `npm eject` - Éjecte la configuration (irréversible)

## 🎨 Personnalisation

### Thème
Modifiez le fichier `src/styles/theme.ts` pour personnaliser les couleurs, typographies et autres propriétés du thème.

### Données des animaux
Ajoutez ou modifiez les données dans `src/data/animals.ts` pour inclure de nouveaux animaux.

### Composants
Tous les composants sont modulaires et réutilisables. Vous pouvez facilement les personnaliser ou en créer de nouveaux.

## 🌍 Fonctionnalités de conservation

L'application met l'accent sur la sensibilisation à la conservation avec :
- Statuts de conservation IUCN
- Informations sur les menaces
- Statistiques de biodiversité
- Liens vers des organisations de conservation

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**BenLe302**
- GitHub: [@BenLe302](https://github.com/BenLe302)

---

*Développé avec ❤️ pour la sensibilisation à la faune sauvage*