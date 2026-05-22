# Recettes App - Carnet de Recettes Mobile

Application mobile de gestion de recettes de cuisine construite avec **React Native / Expo**.

## Fonctionnalités

-   Liste des recettes avec recherche et filtre par catégorie
-   Ajout d'une recette (nom, image, catégorie, temps, difficulté, ingrédients, instructions)
-   Consultation détaillée d'une recette
-   Marquer une recette comme favorite
-   Suppression d'une recette
-   Persistance locale (AsyncStorage)
-   6 recettes de démonstration pré-chargées au premier lancement

## Stack Technique

-   **Framework** : React Native (Expo SDK 56)
-   **Navigation** : React Navigation (Bottom Tabs + Native Stack)
-   **Stockage** : AsyncStorage
-   **UI** : Composants natifs, design sombre, flat design

## Structure du Projet

```
src/
├── components/       # Composants réutilisables
│   ├── RecipeCard.js
│   ├── CategoryPills.js
│   └── IngredientRow.js
├── data/             # Données statiques et seed
│   ├── categories.js
│   └── seed.js
├── navigation/       # Configuration de la navigation
│   └── AppNavigator.js
├── screens/          # Écrans
│   ├── HomeScreen.js
│   ├── AddRecipeScreen.js
│   ├── RecipeDetailScreen.js
│   └── FavoritesScreen.js
└── storage.js        # Gestion AsyncStorage
```

## Installation

```bash
cd recettes-app
npm install
npx expo start
```

Scanner le QR code avec Expo Go (Android/iOS) ou lancer dans un navigateur avec `npx expo start --web`.

## Captures d'Écran

Application mobile React Native avec thème sombre, navigation par onglets (Accueil, Ajouter, Favoris), liste de recettes avec recherche et filtres, formulaire d'ajout dynamique, et vue détaillée avec métriques et instructions pas à pas.
