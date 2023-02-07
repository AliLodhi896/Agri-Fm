import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../constant/Colors';
import {AuthContext} from '../../context/Context';
import {english, spain, brazil} from '../../constant/language';

const LanguageSelection = () => {
  const {language, selectedlang, setSelectedlang, setLanguage} =
    useContext(AuthContext);
  return (
    <View style={styles.mainBox}>

       <TouchableOpacity style={styles.flagBox} onPress={()=>{setLanguage(spain),setSelectedlang('es')}}>
        <Image
              source={require('../../assets/Images/spain-flag.png')}
              style={{width: '100%', height: '100%',borderRadius:100}}
        />
       </TouchableOpacity>
       <TouchableOpacity style={styles.flagBox} onPress={()=>{setLanguage(brazil),setSelectedlang('pt')}}>
        <Image
              source={require('../../assets/Images/brazil-flag.jpg')}
              style={{width: '100%', height: '100%',borderRadius:100}}
        />
       </TouchableOpacity>
        <TouchableOpacity style={styles.flagBox} onPress={()=>{setLanguage(english),setSelectedlang('en')}}>
        <Image
              source={require('../../assets/Images/uk-flag.png')}
              style={{width: '100%', height: '100%',borderRadius:100}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  flagBox: {
    borderRadius: 100,
    width: 90,
    height: 90,
    marginTop: 30,
  },
});

export default LanguageSelection;
