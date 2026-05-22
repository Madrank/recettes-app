import { useState, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { loadRecipes } from '../storage'
import RecipeCard from '../components/RecipeCard'

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([])

  useFocusEffect(
    useCallback(() => {
      loadRecipes().then((r) => setFavorites(r.filter((x) => x.isFavorite)))
    }, [])
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <Text style={styles.subtitle}>
        {favorites.length} recette{favorites.length > 1 ? 's' : ''} favorite{favorites.length > 1 ? 's' : ''}
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={(r) => navigation.navigate('Detail', { recipe: r })} />
        )}
        contentContainerStyle={favorites.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
        ListEmptyComponent={<Text style={styles.empty}>Aucune recette favorite</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070d1a', paddingTop: 60, paddingHorizontal: 20 },
  title: { color: '#f1f5f9', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#64748b', fontSize: 13, marginBottom: 20 },
  empty: { color: '#475569', fontSize: 15, textAlign: 'center' },
})
