import { useState, useCallback } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { loadRecipes } from '../storage'
import RecipeCard from '../components/RecipeCard'
import CategoryPills from '../components/CategoryPills'

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null)

  useFocusEffect(
    useCallback(() => {
      loadRecipes().then(setRecipes)
    }, [])
  )

  const filtered = recipes.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = !category || r.category === category
    return matchSearch && matchCat
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Recettes</Text>
      <Text style={styles.subtitle}>{recipes.length} recette{recipes.length > 1 ? 's' : ''}</Text>

      <TextInput
        style={styles.search}
        placeholder="Rechercher une recette..."
        placeholderTextColor="#475569"
        value={search}
        onChangeText={setSearch}
      />

      <CategoryPills selected={category} onSelect={setCategory} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={(r) => navigation.navigate('Detail', { recipe: r })} />
        )}
        contentContainerStyle={filtered.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {search || category
              ? 'Aucune recette trouvée'
              : 'Ajoute ta première recette !'}
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070d1a', paddingTop: 60, paddingHorizontal: 20 },
  title: { color: '#f1f5f9', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#64748b', fontSize: 13, marginBottom: 20 },
  search: {
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { color: '#475569', fontSize: 15, textAlign: 'center' },
})
