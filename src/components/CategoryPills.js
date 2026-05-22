import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { CATEGORIES } from '../data/categories'

export default function CategoryPills({ selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <TouchableOpacity
        style={[styles.pill, selected === null && styles.pillActive]}
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.pillText, selected === null && styles.pillTextActive]}>Toutes</Text>
      </TouchableOpacity>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={[styles.pill, selected === cat.id && styles.pillActive]}
          onPress={() => onSelect(cat.id)}
        >
          <Text style={[styles.pillText, selected === cat.id && styles.pillTextActive]}>
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#3b82f6',
  },
  pillText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#fff',
  },
})
