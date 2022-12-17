import React, {createContext, useCallback, useEffect, useState} from 'react';
import Colors from '../constant/Colors';

export const AuthContext = createContext({});

export const AuthProvider = props => {

  const [isSignin, setIsSignin] = useState(false)



  return (
    <AuthContext.Provider
      value={{
        isSignin, 
        setIsSignin,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};