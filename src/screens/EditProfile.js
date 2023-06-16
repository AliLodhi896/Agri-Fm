import React, {useState, useContext,useCallback,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header/Header';
import Colors from '../constant/Colors';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ====================== icons ====================
import Input from '../components/Input/Input';
import CommonButton from '../components/Buttons/CommonButton';
import {AuthContext} from '../context/Context';
import {useForm} from 'react-hook-form';
import { base_url } from '../constant/Url';
import Toast from 'react-native-simple-toast';
import Dropdown from '../components/Input/Dropdown';

const EditProfile = () => {
  const {UserData,setUserData,lang,setPhoneNumber,phoneNumber} = useContext(AuthContext);
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      actual_name: UserData[0]?.nombre,
      surname: UserData[0]?.apellidos,
      ActualCompany: UserData[0]?.empresa,
      ActualMobilePhone: UserData[0]?.movil,
      NewJob: UserData[0]?.cargo,
      NewActivity: UserData[0]?.actividad,
      NewLanguage: UserData[0]?.idioma == 1 ? "Brazil" : UserData?.idioma == 2 ? "Spain" : "English",
      NewCountry: UserData[0]?.nombre,
    },
  });
    const navigation = useNavigation();
    const json_Empresa = JSON.stringify(UserData[0]?.empresa)


   const UpdateUser = async data => {
  try {
    let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/editprofile-app.php?id_user=${UserData[0]?.user}&lastname_user=${data?.surname}&name_user=${data?.actual_name}&empresa=${json_Empresa}&cargo=1&actividad=1&idioma=1&country=2&phone=${data?.ActualMobilePhone}`;
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const response_array = []
    const responseData = await response.json();
    response_array.push(responseData)
    if(response_array[0]?.user === null){
      Toast.show('User ID not found !', Toast.LONG);
    }else{
        const jsonValue = JSON.stringify(response_array);
        await AsyncStorage.setItem('userDetails',jsonValue)
        const value = await AsyncStorage.getItem('userDetails')
        const parseUserDetails = JSON.parse(value)
        setPhoneNumber(data?.ActualMobilePhone)
        if(parseUserDetails.length !== 0)
        {
          setUserData(parseUserDetails)
        }
        Toast.show('Profile has been updated sucessfully', Toast.LONG);
        navigation.navigate('Home');
    }

  } catch (error) {
    console.log('error => ', error);
  }
};

const [Jobs, setJob] = useState([{}]);
const [Activity, setActivity] = useState([{}]);
const [Language, setLanguage] = useState([{}]);
const [Countries, setCountries] = useState([{}]);
const [ivalueJob, setIvalueJob] = useState(null);
const [ivalueCountry, setIvalueCountry] = useState(null);
const [ivalueActivity, setIvalueActivity] = useState(null);
const [ivaluelanguage, setIvalueLanguage] = useState(null);
useEffect(() => {
  fetch(
    'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/cargo-app.php',
  )
    .then(res => res.json())

    .then(data => {
        setJob(data.map(el => ({label: el.nombrees, value: el.z})));
    });
}, []);
useEffect(() => {
  fetch(
    'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/actividad-app.php',
  )
    .then(res => res.json())

    .then(data => {
        setActivity(data.map(el => ({label: el.nombrees, value: el.id})));
    });
}, []);
useEffect(() => {
  fetch(
    'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/idioma-app.php',
  )
    .then(res => res.json())

    .then(data => {
        setLanguage(
          data.map(el => ({
            id: el.id,
            label: el.nombrees,
            value: el.id,
          })),
        );
    });
}, []);
useEffect(
  () => {
    if (ivaluelanguage === 'Português') {
      fetch(
        'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/country-app-pt.php',
      )
        .then(res => res.json())

        .then(data => {
            setCountries(
              data.map(el => ({
                id: el.id,
                label: el.nombrees,
                value: el.id,
              })),
            );
        });
    } else if (ivaluelanguage === 'Espanhol') {
      fetch(
        'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/country-app.php',
      )
        .then(res => res.json())

        .then(data => {
            setCountries(
              data.map(el => ({
                id: el.id,
                label: el.nombrees,
                value: el.id,
              })),
            );
        });
    } else {
      fetch(
        'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/country-app-es.php',
      )
        .then(res => res.json())

        .then(data => {
            setCountries(
              data.map(el => ({
                id: el.id,
                label: el.nombrees,
                value: el.id,
              })),
            );
        });
    }
  },
  [ivaluelanguage],
  [],
);









  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={'Edit Profile'}
      />

      <View style={{marginVertical: 30}}>
        <Input
          name="actual_name"
          control={control}
          rules={{
            required: 'ActualName is required',
          }}
          placeholder={language?.ActualName}
        />
        {errors.actual_name && (
          <Text style={styles.errormessage}>
            * {errors.actual_name.message}
          </Text>
        )}
        <Input
          name="surname"
          control={control}
          rules={{
            required: 'surname is required',
          }}
          placeholder={language?.ActualSurname}
        />
        {errors.surname && (
          <Text style={styles.errormessage}>* {errors.surname.message}</Text>
        )}
        <Input
          name="ActualCompany"
          control={control}
          rules={{
            required: 'ActualCompany is required',
          }}
          placeholder={language?.ActualCompany}
        />
        {errors.ActualCompany && (
          <Text style={styles.errormessage}>
            * {errors.ActualCompany.message}
          </Text>
        )}
        <Input
          name="ActualMobilePhone"
          control={control}
          rules={{
            required: 'Actual Mobile Phone is required',
          }}
          placeholder={language?.ActualMobilePhone}
        />
        {errors.ActualMobilePhone && (
          <Text style={styles.errormessage}>
            * {errors.ActualMobilePhone.message}
          </Text>
        )}
      <View style={{marginHorizontal: 40}}>
        <Dropdown
          searchable={true}
          items={Jobs}
          setItems={setJob}
          value={ivalueJob}
          setValue={setIvalueJob}
          zIndex={998}
          placeholder={language?.ChooseYourJob}
        />
        <Dropdown
          // searchable={true}
          items={Activity}
          setItems={setActivity}
          value={ivalueActivity}
          setValue={setIvalueActivity}
          zIndex={998}
          placeholder={language?.ChooseYourActivity}
        />
        <Dropdown
          searchable={true}
          items={Language}
          setItems={setLanguage}
          value={ivaluelanguage}
          setValue={setIvalueLanguage}
          zIndex={998}
          placeholder={language?.ChooseYourLanguage}
        />
        <Dropdown
          searchable={true}
          items={Countries}
          setItems={setCountries}
          value={ivalueCountry}
          setValue={setIvalueCountry}
          zIndex={998}
          placeholder={language?.ChooseYourCountry}
        />
      </View>
        <View style={{marginVertical: 30}}>
          <CommonButton green={true} title={language?.Update} onPress={handleSubmit(UpdateUser)} />
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
            }}>
            {language?.cancel}
          </Text>
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

export default EditProfile;

const data = [
  {
    key: 'Mobile',
    value: '+44444',
  },
  {
    key: 'Company',
    value: 'Testing',
  },
  {
    key: 'Job',
    value: 'Full time',
  },
  {
    key: 'Activity',
    value: 'Media',
  },
  {
    key: 'Production',
    value: 'Avicultura',
  },
  {
    key: 'Details',
    value: 'list of intrestList of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
];
