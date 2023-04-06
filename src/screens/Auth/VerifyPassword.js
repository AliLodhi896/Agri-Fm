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
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {base_url} from '../../constant/Url';

const VerifyPassword = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const {language, selectedlang, setSelectedlang,setUserData,setIsSignin} = useContext(AuthContext);
  const navigation = useNavigation();
  const [registration, setRegistration] = useState({Password: ''});

  const [loading, setLoading] = useState(false)

  const onSubmit = async data => {
    setLoading(true);
    try {
      let baseUrl = `${base_url}/ajax/login-app.php?email=${data.email}&password=${data.verify_password}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log('responseData',responseData);
      if (responseData[0].validation == 'ok') {
        setUserData(responseData[0]);
        console.log('ok')
        setIsSignin(true)
        navigation.navigate(language?.MyAgriFm);
        
      } else {
        navigation.navigate('AccountDetails', {password: data.verify_password,email:data.email});
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={language?.Register}
      />
      <View style={{marginVertical: 30}}>
        <Input
          // style={[styles.input, styles.text]}
          name="email"
          control={control}
          rules={{
            required: 'Email is required',

          }}
          placeholder={language.YourEmail}
          // onChangeText={username => {
          //   setRegistration(prev => ({...prev, Password: username}));
          // }}
        />
        {errors.password && (
          <Text style={styles.errormessage}>* {errors.password.message}</Text>
        )}
        <Input
          name="verify_password"
          control={control}
          rules={{
            required: 'passsword is required',
            // validate: {
            //   positive: value =>
            //     value === watch('password') || 'The passwords do not match',
            // },
            minLength: {
              value: 8,
              message: 'Too short min length is 8',
            },
            maxLength: {
              value: 16,
              message: 'Password maximum length is 16',
            },
          }}
          placeholder={language.VerifyPassword}
        />
        {errors.verify_password && (
          <Text style={styles.errormessage}>
            * {errors.verify_password.message}
          </Text>
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
  text: {
    fontSize: 18,
    color: 'grey',
    paddingHorizontal: 8,
    letterSpacing: -0.575,
  },
});

export default VerifyPassword;
