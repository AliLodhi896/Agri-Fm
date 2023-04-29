import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigation, UserStack } from './AppNavigation';
import { Auth } from './AuthNavigator';
import { GuestNavigation, GuestStack } from './GuestNavigation';

import { AuthContext } from '../context/Context';
import { _navigator } from '../constant/navigationServices';

const AppNavigationContainer = () => {
const {language,setIsSignin,isSignin,selectedlang} = useContext(AuthContext);
console.log('isSignin',isSignin)
  return (
    <NavigationContainer ref={_navigator}>
      {selectedlang == '' ? <Auth /> :  isSignin == false ? <GuestNavigation /> : <AppNavigation /> }
      {/* {selectedlang == '' && <Auth />}
      { !isSignin  && <GuestNavigation />}
      { isSignin  && <AppNavigation />} */}


    </NavigationContainer>
  );
};
export default AppNavigationContainer;