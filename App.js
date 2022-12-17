import React from 'react'
import { View, Text } from 'react-native'


import Explore from './src/screens/Explore'
import MyLibrary from './src/screens/MyLibrary'
import CategoriesDetail from './src/screens/CategoriesDetail'
import { AuthProvider } from './src/context/Context'
import AppNavigationContainer from './src/navigation/NavigationContainer'

const App = () => {
  return (
    <AuthProvider>
      <AppNavigationContainer />
    </AuthProvider>
  )
}

export default App