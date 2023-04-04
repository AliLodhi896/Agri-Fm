import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigation } from './AppNavigation';
import { Auth } from './AuthNavigator';
import { GuestNavigation, GuestStack } from './GuestNavigation';

import { AuthContext } from '../context/Context';

const AppNavigationContainer = () => {
const {language,setIsSignin,isSignin,selectedlang} = useContext(AuthContext);
console.log('isSignin',isSignin)
  return (
    <NavigationContainer>
      {selectedlang == '' ? <Auth /> :  isSignin == false ? <GuestStack /> : <AppNavigation /> }
      {/* {selectedlang == '' && <Auth />}
      { !isSignin  && <GuestNavigation />}
      { isSignin  && <AppNavigation />} */}


    </NavigationContainer>
  );
};
export default AppNavigationContainer;