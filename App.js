import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player';

import Explore from './src/screens/Explore'
import MyLibrary from './src/screens/MyLibrary'
import CategoriesDetail from './src/screens/CategoriesDetail'
import { AuthProvider } from './src/context/Context'
import AppNavigationContainer from './src/navigation/NavigationContainer'
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  const registerPlayer = async () => {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.setupPlayer()
  }

  useEffect(() => {

    registerPlayer()

    setTimeout(() => {
      SplashScreen.hide();
    }, 100);

  }, []);

  return (
    <AuthProvider>
      <AppNavigationContainer />
    </AuthProvider>
  )
}

export default App