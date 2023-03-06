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
import Header from '../../components/Header/Header';
import Colors from '../../constant/Colors';

// ====================== icons ====================
import Input from '../../components/Input/Input';
import CommonButton from '../../components/Buttons/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/Context';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';

const AccountDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const [registration, setRegistration] = useState({
    Name: '',
    Surname: '',
    Company: '',
    Phone: '',
  });
  const combineObject = {...registration, ...route.params.password};
  console.log('route=======>',route.params.email)
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    data.password = route.params.password;
    data.email = route.params.email;
    console.log('email',data?.email)
    navigation.navigate('UserData', {form: data});
  };

  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={'Registration'}
      />
      <View style={{height: 100, marginHorizontal: 20, marginTop: 30}}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={require('../../assets/Images/first.jpg')}
        />
      </View>
      <View style={{marginVertical: 30}}>
        <Input
          name="Name"
          control={control}
          // style={[styles.input, styles.text]}
          rules={{
            required: 'Name is required',
          }}
          // onChangeText={(username)=>{setRegistration(prev => ({...prev, Name: username})) }}
          placeholder={language?.Name}
        />
        {errors.Name && (
          <Text style={styles.errormessage}>* {errors.Name.message}</Text>
        )}

        <Input
          name="Surname"
          control={control}
          // style={[styles.input, styles.text]}
          // onChangeText={(username)=>{setRegistration(prev => ({...prev, Surname: username})) }}
          rules={{
            required: 'Surname is required',
          }}
          placeholder={language?.Surname}
        />
        {errors.Surname && (
          <Text style={styles.errormessage}>* {errors.Surname.message}</Text>
        )}
        
        <Input
          name="Company"
          control={control}
          // style={[styles.input, styles.text]}
          // onChangeText={username => {
          //   setRegistration(prev => ({...prev, Company: username}));
          // }}
          rules={{
            required: 'Company is required',
          }}
          placeholder={language?.Company}
        />
        {errors.Company && (
          <Text style={styles.errormessage}>* {errors.Company.message}</Text>
        )}
        <Input
          name="Phone"
          control={control}
          // style={[styles.input, styles.text]}
          rules={{
            required: 'Phone is required',
          }}
          // onChangeText={username => {
          //   setRegistration(prev => ({...prev, Phone: username}));
          // }}
          keyboardType="number-pad"
          placeholder={language?.Phone}
        />
        {errors.Phone && (
          <Text style={styles.errormessage}>* {errors.Phone.message}</Text>
        )}
        <View style={{marginVertical: 30}}>
          <CommonButton
            green={true}
            onPress={handleSubmit(onSubmit)}
            title={language?.Next}
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

export default AccountDetails;
