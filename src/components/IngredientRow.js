import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function IngredientRow({ ingredient, index, onChange, onRemove }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.nameInput]}
        placeholder="Ingredient"
        placeholderTextColor="#475569"
        value={ingredient.name}
        onChangeText={(v) => onChange(index, 'name', v)}
      />
      <TextInput
        style={[styles.input, styles.qtyInput]}
        placeholder="Qte"
        placeholderTextColor="#475569"
        value={ingredient.quantity}
        onChangeText={(v) => onChange(index, 'quantity', v)}
      />
      {ingredient.name || ingredient.quantity ? (
        <TouchableOpacity onPress={() => onRemove(index)} style={styles.removeBtn}>
          <Text style={styles.removeText}>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  input: {
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  nameInput: { flex: 2 },
  qtyInput: { flex: 1 },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7f1d1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: { color: '#fca5a5', fontWeight: '700', fontSize: 13 },
})
