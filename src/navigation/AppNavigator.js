import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import AddRecipeScreen from '../screens/AddRecipeScreen'
import RecipeDetailScreen from '../screens/RecipeDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabIcon({ label, focused }) {
  const icons = {
    Accueil: focused ? 'house-filled' : 'house-outlined',
    Ajouter: focused ? 'add-circle-filled' : 'add-circle-outlined',
    Favoris: focused ? 'heart-filled' : 'heart-outlined',
  }
  return null
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen name="Detail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  )
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavList" component={FavoritesScreen} />
      <Stack.Screen name="Detail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0f172a',
            borderTopColor: '#1e293b',
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#475569',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={HomeStack}
          options={{ tabBarLabel: 'Accueil', tabBarIcon: ({ focused }) => null }}
        />
        <Tab.Screen
          name="Ajouter"
          component={AddRecipeScreen}
          options={{ tabBarLabel: 'Ajouter', tabBarIcon: ({ focused }) => null }}
        />
        <Tab.Screen
          name="Favoris"
          component={FavoritesStack}
          options={{ tabBarLabel: 'Favoris', tabBarIcon: ({ focused }) => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
