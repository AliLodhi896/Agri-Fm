import React, {createContext, useCallback, useEffect, useState} from 'react';
import Colors from '../constant/Colors';

export const AuthContext = createContext({});

export const AuthProvider = props => {

  const [isSignin, setIsSignin] = useState(false)
  const [language, setLanguage] = useState(null)
  const [selectedlang, setSelectedlang] = useState('')

  return (
    <AuthContext.Provider
      value={{
        isSignin, 
        setIsSignin,
        setLanguage,
        language,
        selectedlang,
        setSelectedlang
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};