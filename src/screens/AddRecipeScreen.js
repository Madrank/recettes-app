import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert,
} from 'react-native'
import { CATEGORIES } from '../data/categories'
import { addRecipe } from '../storage'
import IngredientRow from '../components/IngredientRow'

const emptyIngredient = { name: '', quantity: '' }

export default function AddRecipeScreen({ navigation }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('plat')
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [difficulty, setDifficulty] = useState('Facile')
  const [ingredients, setIngredients] = useState([{ ...emptyIngredient }])
  const [instructions, setInstructions] = useState([''])

  const updateIngredient = (idx, field, value) => {
    setIngredients((prev) => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: value }
      return next
    })
  }

  const addIngredient = () => setIngredients((prev) => [...prev, { ...emptyIngredient }])
  const removeIngredient = (idx) => setIngredients((prev) => prev.filter((_, i) => i !== idx))

  const updateInstruction = (idx, value) => {
    setInstructions((prev) => {
      const next = [...prev]
      next[idx] = value
      return next
    })
  }

  const addInstruction = () => setInstructions((prev) => [...prev, ''])
  const removeInstruction = (idx) => setInstructions((prev) => prev.filter((_, i) => i !== idx))

  const handleSave = async () => {
    if (!name.trim()) { Alert.alert('Erreur', 'Le nom est obligatoire'); return }
    const validIngredients = ingredients.filter((i) => i.name.trim())
    const validInstructions = instructions.filter((i) => i.trim())
    if (validIngredients.length === 0) { Alert.alert('Erreur', 'Ajoute au moins un ingrédient'); return }
    if (validInstructions.length === 0) { Alert.alert('Erreur', 'Ajoute au moins une instruction'); return }

    await addRecipe({
      name: name.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400',
      category,
      prepTime: parseInt(prepTime) || 0,
      cookTime: parseInt(cookTime) || 0,
      difficulty: difficulty || 'Facile',
      ingredients: validIngredients,
      instructions: validInstructions,
    })
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>Nouvelle Recette</Text>

      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex: Tarte aux pommes" placeholderTextColor="#475569" />

      <Text style={styles.label}>Image (URL)</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="https://..." placeholderTextColor="#475569" />

      <Text style={styles.label}>Catégorie</Text>
      <View style={styles.chips}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.chip, category === c.id && { backgroundColor: c.color }]}
            onPress={() => setCategory(c.id)}
          >
            <Text style={[styles.chipText, category === c.id && { color: '#fff' }]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Préparation (min)</Text>
          <TextInput style={styles.input} value={prepTime} onChangeText={setPrepTime} keyboardType="numeric" placeholder="15" placeholderTextColor="#475569" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Cuisson (min)</Text>
          <TextInput style={styles.input} value={cookTime} onChangeText={setCookTime} keyboardType="numeric" placeholder="30" placeholderTextColor="#475569" />
        </View>
      </View>

      <Text style={styles.label}>Difficulté</Text>
      <View style={styles.chips}>
        {['Facile', 'Moyen', 'Difficile'].map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.chip, difficulty === d && styles.chipActive]}
            onPress={() => setDifficulty(d)}
          >
            <Text style={[styles.chipText, difficulty === d && styles.chipTextActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.label}>Ingrédients</Text>
        <TouchableOpacity onPress={addIngredient}><Text style={styles.addBtn}>+ Ajouter</Text></TouchableOpacity>
      </View>
      {ingredients.map((ing, i) => (
        <IngredientRow key={i} ingredient={ing} index={i} onChange={updateIngredient} onRemove={removeIngredient} />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.label}>Instructions</Text>
        <TouchableOpacity onPress={addInstruction}><Text style={styles.addBtn}>+ Ajouter</Text></TouchableOpacity>
      </View>
      {instructions.map((inst, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
          <View style={styles.stepCircle}><Text style={styles.stepNum}>{i + 1}</Text></View>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={inst}
            onChangeText={(v) => updateInstruction(i, v)}
            placeholder={`Etape ${i + 1}`}
            placeholderTextColor="#475569"
            multiline
          />
          <TouchableOpacity onPress={() => removeInstruction(i)} style={styles.removeStep}>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Enregistrer la recette</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070d1a', paddingTop: 60, paddingHorizontal: 20 },
  title: { color: '#f1f5f9', fontSize: 24, fontWeight: '800', marginBottom: 24 },
  label: { color: '#94a3b8', fontSize: 13, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#1e293b', color: '#f1f5f9', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, marginBottom: 16,
  },
  row: { flexDirection: 'row', gap: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16, backgroundColor: '#1e293b',
    borderWidth: 1, borderColor: '#334155',
  },
  chipActive: { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
  chipText: { color: '#94a3b8', fontSize: 12, fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 8 },
  addBtn: { color: '#3b82f6', fontSize: 13, fontWeight: '600' },
  stepCircle: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: '#3b82f6',
    alignItems: 'center', justifyContent: 'center',
  },
  stepNum: { color: '#fff', fontWeight: '700', fontSize: 12 },
  removeStep: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#7f1d1d',
    alignItems: 'center', justifyContent: 'center',
  },
  removeText: { color: '#fca5a5', fontWeight: '700', fontSize: 13 },
  saveBtn: {
    backgroundColor: '#3b82f6', borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    marginTop: 16,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})
