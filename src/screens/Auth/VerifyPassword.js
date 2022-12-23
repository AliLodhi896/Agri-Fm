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

const VerifyPassword = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors, isValid},
      } = useForm({mode: 'all'});

  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={'Login/Registration'}
      />
      <View style={{marginVertical: 30}}>
        <Input
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          placeholder="Password"
        />
        {errors.password && (
          <Text style={styles.errormessage}>* {errors.password.message}</Text>
        )}
        <Input
          name="verify_password"
          control={control}
          rules={{
            required: 'Verify Password is required',
          }}
          placeholder="Verify Password"
        />
        {errors.verify_password && (
          <Text style={styles.errormessage}>
            * {errors.verify_password.message}
          </Text>
        )}
        <View style={{marginVertical: 30}}>
          <CommonButton  onPress={()=>navigation.navigate('AccountDetails')} green={true} title={language?.Next} />
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
});

export default VerifyPassword;
