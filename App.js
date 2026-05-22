import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigation/AppNavigator'
import { loadRecipes, saveRecipes } from './src/storage'
import { SEED_RECIPES } from './src/data/seed'

export default function App() {
  useEffect(() => {
    loadRecipes().then(async (recipes) => {
      if (recipes.length === 0) {
        const seeded = SEED_RECIPES.map((r) => ({
          ...r,
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          createdAt: new Date().toISOString(),
          isFavorite: false,
        }))
        await saveRecipes(seeded)
      }
    })
  }, [])

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  )
}
