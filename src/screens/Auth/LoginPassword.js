import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SocialModal from '../../components/Cards/Modals/SocialModal';
import Header from '../../components/Header/Header';
import Colors from '../../constant/Colors';

// ====================== icons ====================
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import WhiteButton from '../../components/Buttons/WhiteButton';
import Input from '../../components/Input/Input';
import CommonButton from '../../components/Buttons/CommonButton';
import {AuthContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useRoute, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {base_url} from '../../constant/Url';
import Toast from 'react-native-simple-toast';
const LoginPassword = () => {
  const navigation = useNavigation();
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const {language, selectedlang, setSelectedlang, setUserData,setIsSignin} =
    useContext(AuthContext);
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  
  const onSubmit = async data => {
    setLoading(true);
    try {
      let baseUrl = `${base_url}/ajax/login-app.php?email=${route.params.email}&password=${data.password}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log('responseData',responseData)
      if (responseData[0].validation  === "No hemos encontrado ningún usuario con este email, por favor cree una cuenta." || responseData[0].validation === 'Revise su email y contraseña' ) {
        alert(responseData[0].validation);
      } else {
        const jsonValue = JSON.stringify(responseData);
        await AsyncStorage.setItem('userDetails',jsonValue)
        setIsSignin(true)
      }

      setLoading(false);
    } catch (error) {
      console.log('error => ', error);
      setLoading(false);
      //
      //
    }
  };
  // [{"validation": "No hemos encontrado ningún usuario con este email, por favor cree una cuenta."}]
// [{"validation": "Revise su email y contraseña"}]
  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={language?.Login}
      />
      <View style={{marginVertical: 30}}>
        <Input
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          placeholder={language?.YourPassword}
          //   onChangeText={(username) => setPass(username)}
          defaultValue={pass}
        />
        {errors.password && (
          <Text style={styles.errormessage}>* {errors.password.message}</Text>
        )}

        <View style={{marginVertical: 30}}>
          <CommonButton
            onPress={handleSubmit(onSubmit)}
            green={true}
            title={language?.Next}
            loading={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    // paddingHorizontal: 20,
  },
  errormessage: {
    color: 'red',
    marginLeft: '8%',
  },
  edit: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
  },
  image: {width: 100, height: 100, borderRadius: 100},
  welcome: {
    color: Colors.secondary,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.placeholder,
  },
});

export default LoginPassword;
