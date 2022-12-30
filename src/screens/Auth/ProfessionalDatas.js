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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useRoute} from '@react-navigation/native';

// ====================== icons ====================

import CheckBoxWithLable from '../../components/CheckBox/CheckboxWithLable';
import CommonButton from '../../components/Buttons/CommonButton';
import CommonBack from '../../components/CommonBack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/Context';
import {base_url} from '../../constant/Url';

const ProfessionalDatas = () => {
  const route = useRoute();
  console.log(route.params.value, route.params.updatedform, 'testing <');

  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const [selectSpecies, setSelectSpecies] = useState(false);
  const [Species, setSpecies] = useState([{}]);
  const [DetailSpecies, setDetailSpecies] = useState([{}]);
  const [selectDetailSpecies, setSelectDetailSpecies] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedSpeciesDetail, setSelectedSpeciesDetail] = useState([]);

  useEffect(() => {
    fetch(
      'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/especies-app.php',
    )
      .then(res => res.json())

      .then(data => {
        console.log(data, 'Jobs'), setSpecies(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      'https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/animals-app.php',
    )
      .then(res => res.json())

      .then(data => {
        console.log(data, 'Jobs'), setDetailSpecies(data);
      });
  }, []);
  const fetchData = () => {
    return fetch(
      'https://socialagri.com/agriFM/wpcontent/themes/agriFM/laptop/ajax/registroapp.php',
    )
      .then(response => response.json())
      .then(data => {
        console.log(data, 'CheckResult');
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
      Email,
    } = route.params.updatedform;
    setLoading(true);
    try {
      let baseUrl = `${base_url}/ajax/registroapp.php`;

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          lastname: Surname,
          codltf: '34',
          telefono: Phone,
          password: password,
          email: Email,
          country: country,
          NombreEmpresa: Company,
          actividad: activity,
          cargo: jobValue,
          espescies: selectedSpecies.toString(),
          detalles: selectedSpeciesDetail.toString(),
          idioma: lang,
        }),
      });

      const responseData = await response.json();

      setLoading(false);
      //   navigation.navigate('Home');
    } catch (error) {
      console.log('error => ', error);
      setLoading(false);
      //
      //
    }
  };

  console.log('tsting 123 => ', route.params.updatedform);

  const object = {
    name: 'Ayan',
    lastname: 'Ahmed',
    codltf: '34',
    telefono: '66666666',
    password: 'testttt',
    email: 'ayan@gmail.com',
    country: '92',
    NombreEmpresa: 'Grupo',
    actividad: '12',
    cargo: '2',
    espescies: '1,2',
    detalles: '8,9',
    idioma: '1',
  };

  const _selectSpecies = id => {
    const _input = [...selectedSpecies];
    if (_input.includes(id)) {
      const newarray = _input.filter((item, index) => item !== id);
      setSelectedSpecies(newarray);
    } else {
      _input.push(id);
      setSelectedSpecies(_input);
    }
  };

  const _selectSpeciesDetails = id => {
    const _input = [...selectedSpeciesDetail];
    if (_input.includes(id)) {
      const newarray = _input.filter((item, index) => item !== id);
      setSelectedSpeciesDetail(newarray);
    } else {
      _input.push(id);
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
        title={'Change Production'}
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
        }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: Colors.secondary,
          }}>
          {language?.SelectYourSpecies}
        </Text>
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
                onPress={() => _selectSpecies(item.id)}
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
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: Colors.secondary,
          }}>
          {language?.SelectYourSpeciesDetails}
        </Text>
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
                onPress={() => _selectSpeciesDetails(item.id)}
              />
            );
          })}
        </View>
      ) : null}

      <CommonButton
        green={true}
        onPress={() => {
          onSubmit(), navigation.navigate('SelectInterest');
        }}
        title={language?.Next}
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
