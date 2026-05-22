import { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { CATEGORIES } from '../data/categories'
import { toggleFavorite, deleteRecipe } from '../storage'

export default function RecipeDetailScreen({ route, navigation }) {
  const [recipe, setRecipe] = useState(route.params.recipe)
  const cat = CATEGORIES.find((c) => c.id === recipe.category)

  const handleToggleFavorite = async () => {
    const updated = await toggleFavorite(recipe.id)
    const found = updated.find((r) => r.id === recipe.id)
    if (found) setRecipe(found)
  }

  const handleDelete = () => {
    Alert.alert('Supprimer', `Supprimer "${recipe.name}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer', style: 'destructive',
        onPress: async () => {
          await deleteRecipe(recipe.id)
          navigation.goBack()
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{recipe.name}</Text>
            {cat && <Text style={[styles.cat, { color: cat.color }]}>{cat.label}</Text>}
          </View>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Text style={styles.favIcon}>{recipe.isFavorite ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{recipe.prepTime + recipe.cookTime}</Text>
            <Text style={styles.metaLabel}>min total</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{recipe.prepTime}</Text>
            <Text style={styles.metaLabel}>prep</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{recipe.cookTime}</Text>
            <Text style={styles.metaLabel}>cuisson</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{recipe.difficulty}</Text>
            <Text style={styles.metaLabel}>difficulte</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingrédients</Text>
        {recipe.ingredients.map((ing, i) => (
          <View key={i} style={styles.ingRow}>
            <View style={styles.dot} />
            <Text style={styles.ingName}>{ing.name}</Text>
            <Text style={styles.ingQty}>{ing.quantity}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((inst, i) => (
          <View key={i} style={styles.instRow}>
            <View style={styles.stepBadge}><Text style={styles.stepNum}>{i + 1}</Text></View>
            <Text style={styles.instText}>{inst}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Supprimer la recette</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070d1a' },
  image: { width: '100%', height: 260, backgroundColor: '#1e293b' },
  overlay: { position: 'absolute', top: 50, left: 20 },
  backBtn: {
    backgroundColor: 'rgba(7,13,26,0.8)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10,
  },
  backText: { color: '#f1f5f9', fontSize: 14, fontWeight: '600' },
  body: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  name: { color: '#f1f5f9', fontSize: 24, fontWeight: '800', marginBottom: 4 },
  cat: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  favIcon: { fontSize: 28, color: '#ec4899', marginLeft: 12 },
  metaRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  metaItem: {
    flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 12, alignItems: 'center',
  },
  metaValue: { color: '#f1f5f9', fontSize: 16, fontWeight: '700' },
  metaLabel: { color: '#64748b', fontSize: 11, marginTop: 2, textTransform: 'uppercase' },
  sectionTitle: {
    color: '#94a3b8', fontSize: 13, fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: 0.5, marginBottom: 12, marginTop: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3b82f6' },
  ingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10,
    backgroundColor: '#1e293b', padding: 12, borderRadius: 10,
  },
  ingName: { color: '#f1f5f9', fontSize: 14, flex: 1 },
  ingQty: { color: '#94a3b8', fontSize: 13 },
  instRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  stepBadge: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#3b82f6',
    alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  stepNum: { color: '#fff', fontWeight: '700', fontSize: 13 },
  instText: { color: '#cbd5e1', fontSize: 14, flex: 1, lineHeight: 21 },
  deleteBtn: {
    marginTop: 24, borderWidth: 1, borderColor: '#7f1d1d', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  deleteText: { color: '#fca5a5', fontSize: 14, fontWeight: '600' },
})
