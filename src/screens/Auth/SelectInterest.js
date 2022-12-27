import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../../constant/Colors';
import SearchInput from '../../components/Inputs/SearchInput';
import InterestCard from '../../components/Cards/InterestCard';
import Header from '../../components/Header/Header';
import * as Animatable from 'react-native-animatable';
import CommonBack from '../../components/CommonBack';
import CommonButton from '../../components/Buttons/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/Context';
import {base_url} from '../../constant/Url';

const SelectInterest = () => {
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const [interest, setInterest] = useState([]);
  const [check, setCheck] = useState('');
  const [selectedIntrest, setSelectedIntrest] = useState([]);
  const [loading, setLoading] = useState(false);
  const Interest = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const navigation = useNavigation();
  useEffect(() => {
    fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/')
      .then(res => res.json())

      .then(data => {
        setInterest(data.length == 0 ? undefined || null : data);
      });
  }, []);

  const _selectIntrest = id => {
    if (selectedIntrest.includes(id)) {
      const _input = [...selectedIntrest];
      const newarray = _input.filter((item, index) => item !== id);
      setSelectedIntrest(newarray);
    } else {
      const _input = [...selectedIntrest];
      _input.push(id);
      setSelectedIntrest(_input);
    }
  };

  const onSubmit = async data => {
    setLoading(true);
    try {
      let base_url = `${base_url}/intereses-app.php`;
      let form_data = new FormData();
      form_data.append('id_user', 22301);
      form_data.append('interest', selectedIntrest.toString());
      const response = await fetch(base_url, {
        method: 'POST',
        body: form_data,
        headers: {
          Accept: 'application/json',
        },
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

  return (
    <ScrollView style={styles.mainBox}>
      <Header icon={true} />
      <View style={styles.cardBox}>
        <View style={styles.headingBox}>
          <Text style={styles.mainHeading}>{language?.Select5Interests}</Text>
        </View>
        <Animatable.View style={styles.interestlList} animation="fadeInUpBig">
          {interest.map(item => {
            return (
              <InterestCard
                onPress={() => _selectIntrest(item.id)}
                // mainStyle={{width: 170}}
                checkFunc={setCheck}
                description={item.name}
                img_intereses={item.acf.img_intereses}
                id={item.id}
                opacity={selectedIntrest.includes(item.id)}
              />
            );
          })}
        </Animatable.View>
      </View>
      <Animatable.View animation="fadeInUpBig">
        <CommonButton
          green={true}
          onPress={onSubmit}
          title={language?.Next}
          loading={loading}
        />
        <CommonBack title={language?.GoBack} />
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
  },
  cardBox: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 25,
  },
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.secondary,
  },
  interestlList: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SelectInterest;
