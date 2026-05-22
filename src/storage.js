import AsyncStorage from '@react-native-async-storage/async-storage'

const RECIPES_KEY = '@recettes'

export async function loadRecipes() {
  try {
    const raw = await AsyncStorage.getItem(RECIPES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export async function saveRecipes(recipes) {
  await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(recipes))
}

export async function addRecipe(recipe) {
  const recipes = await loadRecipes()
  const newRecipe = {
    ...recipe,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
    isFavorite: false,
  }
  recipes.unshift(newRecipe)
  await saveRecipes(recipes)
  return newRecipe
}

export async function toggleFavorite(id) {
  const recipes = await loadRecipes()
  const idx = recipes.findIndex((r) => r.id === id)
  if (idx === -1) return recipes
  recipes[idx].isFavorite = !recipes[idx].isFavorite
  await saveRecipes(recipes)
  return recipes
}

export async function deleteRecipe(id) {
  const recipes = await loadRecipes()
  const filtered = recipes.filter((r) => r.id !== id)
  await saveRecipes(filtered)
  return filtered
}
