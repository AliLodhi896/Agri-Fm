import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigation } from './AppNavigation';
import { Auth } from './AuthNavigator';

import { AuthContext } from '../context/Context';

const AppNavigationContainer = () => {
const {language} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {language !== null ? <AppNavigation /> : <Auth />}
    </NavigationContainer>
  );
};
export default AppNavigationContainer;