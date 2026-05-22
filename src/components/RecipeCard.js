import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { CATEGORIES } from '../data/categories'

export default function RecipeCard({ recipe, onPress }) {
  const cat = CATEGORIES.find((c) => c.id === recipe.category)
  const color = cat?.color || '#64748b'

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(recipe)} activeOpacity={0.85}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.badge}>
        <Text style={[styles.badgeText, { color }]}>{cat?.label || recipe.category}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <Text style={styles.meta}>
          {recipe.prepTime + recipe.cookTime}min · {recipe.difficulty}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#334155',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(15,23,42,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  body: {
    padding: 14,
  },
  name: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: '#64748b',
    fontSize: 12,
  },
})
