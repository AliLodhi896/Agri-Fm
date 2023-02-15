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
import Header from '../../components/Header/Header';
import Colors from '../../constant/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useRoute} from '@react-navigation/native';

import Toast from 'react-native-simple-toast';
// ====================== icons ====================

import CheckBoxWithLable from '../../components/CheckBox/CheckboxWithLable';
import CommonButton from '../../components/Buttons/CommonButton';
import CommonBack from '../../components/CommonBack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/Context';
import {base_url} from '../../constant/Url';

const ProfessionalDatas = () => {
  const route = useRoute();

  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang,setUserData,UserData,setIsSignin} = useContext(AuthContext);
  const [selectSpecies, setSelectSpecies] = useState(false);
  const [Species, setSpecies] = useState([{}]);
  const [DetailSpecies, setDetailSpecies] = useState([{}]);
  const [selectDetailSpecies, setSelectDetailSpecies] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedSpeciesDetail, setSelectedSpeciesDetail] = useState([]);
  const [selectedSpeciesName, setSelectedSpeciesName] = useState([]);
  const [selectedSpeciesDetailName, setSelectedSpeciesDetailName] = useState([]);


  
console.log('selectedSpeciesName',selectedSpeciesName)
  useEffect(() => {
    fetch(
      'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/especies-app.php',
    )
      .then(res => res.json())

      .then(data => {
       setSpecies(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/animals-app.php',
    )
      .then(res => res.json())

      .then(data => {
        setDetailSpecies(data);
      });
  }, []);
  const fetchData = () => {
    return fetch(
      'https://socialagri.com/agriFM/wpcontent/themes/agriFM/laptop/ajax/registroapp.php',
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data, 'CheckResult');
      })
      .catch(err => {
        console.log(err, 'API Failed');
      });
  };
  const onSubmit = async data => {
    const {
      Company,
      Name,
      Phone,
      Surname,
      activity,
      country,
      jobValue,
      lang,
      password,
      email,
    } = route.params.updatedform;
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("USPTO-API-KEY", "i5P2hLSjYRREYNt7NO3rzZJYCrqZDIcH");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
          'name': Name,
          'lastname': Surname,
          'codltf': '34',
          'telefono': Phone,
          'password': password,
          'email': email,
          'country': country,
          'NombreEspresa': Company,
          'actividad': activity,
          'cargo': jobValue,
          'especies': selectedSpecies.toString(),
          'detalles': selectedSpeciesDetail.toString(),
          'idioma': lang,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/registroapp-end.php", requestOptions)
      .then(response => response.text())
      .then(result => 
        {console.log('result----------------->',result)
          if(result == 'Email ya registrado'){
          Toast.show('Email already registered', Toast.LONG);
          navigation.navigate('LoginEmail');
        }else{
          setUserData(result);
          console.log('result',result)
          // Toast.show('Registered successfully', Toast.LONG);
          // setIsSignin(true)
          // navigation.navigate('SelectInterest');
          // console.log('else result->',result)
        }}
        )
      .catch(error => console.log('error', error));
    setLoading(false);



  };


  const _selectSpecies = itemx => {
    console.log('itemxxx',itemx)
    const _input = [...selectedSpecies];
    const _names = [...selectedSpeciesName]
    if (_input.includes(itemx?.id)) {
      const newarray = _input.filter((item, index) => item !== itemx?.id);
      const namearray = _names.filter((item, index) => item !== itemx?.nombrees);
      setSelectedSpeciesName(namearray)
      setSelectedSpecies(newarray);
    } else {
      _input.push(itemx?.id);
      _names.push(itemx?.nombrees)
      setSelectedSpecies(_input);
      setSelectedSpeciesName(_names)
    }
  };
  // selectedSpeciesDetailName
  // setSelectedSpeciesDetailName
  const _selectSpeciesDetails = itemx => {
    const _input = [...selectedSpeciesDetail];
    const _names = [...selectedSpeciesDetailName];

    if (_input.includes(itemx?.id)) {
      const newarray = _input.filter((item, index) => item !== itemx?.id);
      const namearray = _names.filter((item, index) => item !== itemx?.id);

      setSelectedSpeciesDetail(newarray);
      setSelectedSpeciesDetailName(namearray)
    } else {
      _input.push(itemx?.id);
      _names.push(itemx?.nombrees)
      setSelectedSpeciesDetailName(_names)
      setSelectedSpeciesDetail(_input);
    }
  };

  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={'Select Interest'}
      />
      <View style={{height: 100, marginHorizontal: 20, marginTop: 30}}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={require('../../assets/Images/last.jpg')}
        />
      </View>
      <TouchableOpacity
        onPress={() => setSelectSpecies(!selectSpecies)}
        style={{
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'white',
          textAlign: 'center',
          marginHorizontal: 25,
          padding: 15,
          flexDirection: 'row',
          marginTop: 20,
          borderRadius: 10,
          flexWrap:"wrap"
        }}>
            {selectedSpeciesName?.length !== 0 ?
              selectedSpeciesName?.slice(0, 2).map((item)=>{
                return(
                  <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Colors.secondary,
                  }}>
                  {item},
                  </Text>
                );
              })
            : 
            <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: Colors.secondary,
                  }}>
                  {language?.SelectYourSpecies}
                  </Text>
            }

          
       
        <SimpleLineIcons
          name="arrow-down"
          color={'white'}
          size={20}
          style={{fontWeight: '700'}}
        />
      </TouchableOpacity>
      {selectSpecies == true ? (
        <View style={{marginHorizontal: '10%', marginTop: '5%'}}>
          {Species.map(item => {
            return (
              <CheckBoxWithLable
                status={selectedSpecies.includes(item.id)}
                lable={item.nombrees}
                onPress={() => _selectSpecies(item)}
              />
            );
          })}
        </View>
      ) : null}

      <TouchableOpacity
        onPress={() => setSelectDetailSpecies(!selectDetailSpecies)}
        style={{
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'white',
          textAlign: 'center',
          marginHorizontal: 25,
          padding: 15,
          flexDirection: 'row',
          marginTop: 50,
          borderRadius: 10,
        }}>
          {selectedSpeciesDetailName?.length !== 0 ?
            selectedSpeciesDetailName?.slice(0, 2).map((item)=>{
              return(
                <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: Colors.secondary,
                }}>
                {item},
                </Text>
              );
            })
          :
          <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: Colors.secondary,
          }}>
          {language?.SelectYourSpeciesDetails}
        </Text>
          }
        
        <SimpleLineIcons
          name="arrow-down"
          color={'white'}
          size={20}
          style={{fontWeight: '700'}}
        />
      </TouchableOpacity>
      {selectDetailSpecies == true ? (
        <View style={{marginHorizontal: '10%', marginTop: '5%'}}>
          {DetailSpecies.map(item => {
            return (
              <CheckBoxWithLable
                status={selectedSpeciesDetail.includes(item.id)}
                lable={item.nombrees}
                onPress={() => _selectSpeciesDetails(item)}
              />
            );
          })}
        </View>
      ) : null}

      <CommonButton
        green={true}
        onPress={() =>onSubmit()}
        title={language?.Next}
        loading={loading}
      />
      <CommonBack title={language?.GoBack} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.primary,
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

export default ProfessionalDatas;
