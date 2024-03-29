import React, {useState, useContext, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import {AuthContext} from '../../context/Context';
import Dropdown from '../../components/Input/Dropdown';

const UserData = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const combineObject = {...UserdataObject, ...route.params.form};
  const [Jobs, setJob] = useState([{}]);
  const [Activity, setActivity] = useState([{}]);
  const [Language, setLanguage] = useState([{}]);
  const [Countries, setCountries] = useState([{}]);
  const [ivalueJob, setIvalueJob] = useState(null);
  const [ivalueCountry, setIvalueCountry] = useState(null);
  const [ivalueActivity, setIvalueActivity] = useState(null);
  const [ivaluelanguage, setIvalueLanguage] = useState(null);
  const UserdataObject = {
    Job: ivalueJob,
    Activity: ivalueActivity,
    Language: ivaluelanguage,
    County: ivalueCountry,
  };

  console.log('language',selectedlang)

  const onSubmit = () => {
    combineObject.jobValue = ivalueJob;
    combineObject.country = ivalueCountry;
    combineObject.activity = ivalueActivity;
    combineObject.lang = ivaluelanguage;
    navigation.navigate('ProfessionalDatas', {
      updatedform: combineObject,
    });
  };


  const GetJObs = async data => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/cargo-app-end.php?lang=${selectedlang}`;
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if(responseData){
        setJob(responseData?.map(el => ({label: el.name, value: el.id})));
      }else{
          
      }
    } catch (error) {
      console.log('Network Request Failed=> ', error);
    }
  };

  const GetActivity = async data => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/actividad-app-end.php?lang=${selectedlang}`;
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log('response-------->',responseData)
      if(responseData){
        setActivity(responseData?.map(el => ({label: el.name, value: el.id})));
      }else{
          
      }
    } catch (error) {
      console.log('Network Request Failed=> ', error);
    }
  };

  const GetLanguages = async data => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/idioma-app-end.php?lang=${selectedlang}`;
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if(responseData){
        setLanguage(responseData?.map(el => ({label: el.name, value: el.id})));
      }else{
          
      }
    } catch (error) {
      console.log('Network Request Failed=> ', error);
    }
  };

  useEffect(() => {
   GetJObs();
   GetActivity();
   GetLanguages();
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
          source={require('../../assets/Images/second.jpg')}
        />
      </View>
      <View style={{marginVertical: 30, marginHorizontal: 20}}>
        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:30,marginBottom:-20}}>Select Job : {ivalueJob}</Text>
        <Dropdown
          searchable={true}
          items={Jobs}
          setItems={setJob}
          value={ivalueJob}
          setValue={setIvalueJob}
          zIndex={998}
          placeholder={language?.ChooseYourJob}
        />
        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:30,marginBottom:-20}}>Select Activity : {ivalueActivity}</Text>
        <Dropdown
          // searchable={true}
          items={Activity}
          setItems={setActivity}
          value={ivalueActivity}
          setValue={setIvalueActivity}
          zIndex={998}
          placeholder={language?.ChooseYourActivity}
        />
        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:30,marginBottom:-20}}>Select Language : {ivaluelanguage}</Text>

        <Dropdown
          searchable={true}
          items={Language}
          setItems={setLanguage}
          value={ivaluelanguage}
          setValue={setIvalueLanguage}
          zIndex={998}
          placeholder={language?.ChooseYourLanguage}
        />
        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:30,marginBottom:-20}}>Select Countries : {ivalueCountry}</Text>

        <Dropdown
          searchable={true}
          items={Countries}
          setItems={setCountries}
          value={ivalueCountry}
          setValue={setIvalueCountry}
          zIndex={998}
          placeholder={language?.ChooseYourCountry}
        />
        <View style={{marginVertical: 30}}>
          <CommonButton
            green={true}
            onPress={() => onSubmit()}
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
export default UserData;
