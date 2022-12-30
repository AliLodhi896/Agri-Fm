import React, {createContext, useCallback, useEffect, useState} from 'react';
import Colors from '../constant/Colors';

export const AuthContext = createContext({});

export const AuthProvider = props => {
  const [isSignin, setIsSignin] = useState(false);
  const [language, setLanguage] = useState(null);
  const [selectedlang, setSelectedlang] = useState('');
  const [UserData, setUserData] = useState({});

  return (
    <AuthContext.Provider
      value={{
        isSignin,
        setIsSignin,
        setLanguage,
        language,
        selectedlang,
        setSelectedlang,
        UserData,
        setUserData,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
