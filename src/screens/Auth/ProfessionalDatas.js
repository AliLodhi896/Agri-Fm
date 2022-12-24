import React, {useState, useContext} from 'react';
import {StyleSheet, View, Image, Text, TextInput,TouchableOpacity,ScrollView} from 'react-native';
import SocialModal from '../../components/Cards/Modals/SocialModal';
import Header from '../../components/Header/Header';
import Colors from '../../constant/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useRoute } from '@react-navigation/native';


// ====================== icons ====================

import CheckBoxWithLable from '../../components/CheckBox/CheckboxWithLable';
import CommonButton from '../../components/Buttons/CommonButton';
import CommonBack from '../../components/CommonBack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/Context';

const ProfessionalDatas = () => {

    const route = useRoute();
    console.log(route.params.updatedform,'UpdatedOne')

  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    const [selectSpecies, setSelectSpecies] = useState(false)
    const [selectDetailSpecies, setSelectDetailSpecies] = useState(false)
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
      <TouchableOpacity onPress={()=>setSelectSpecies(!selectSpecies)} style={{justifyContent:'space-between',borderWidth:1,borderColor:'white',textAlign: 'center',marginHorizontal:25,padding:15,flexDirection:'row',marginTop:20,borderRadius:10}}>
        <Text
            style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: Colors.secondary,
            }}>
            {language?.SelectYourSpecies}
        </Text>
        <SimpleLineIcons name="arrow-down" color={'white'} size={20} style={{fontWeight:'700'}} />
      </TouchableOpacity>
    {selectSpecies == true ?

        <View style={{marginHorizontal: '10%', marginTop: '5%'}}>
        <CheckBoxWithLable status={true} lable={'Avicultura'} />
        <CheckBoxWithLable status={true} lable={'Swine'} />
        <CheckBoxWithLable status={true} lable={'Ruminant'} />
        <CheckBoxWithLable status={true} lable={'Avicultura'} />
        </View>
    : 
    null
    }

    <TouchableOpacity onPress={()=>setSelectDetailSpecies(!selectDetailSpecies)} style={{justifyContent:'space-between',borderWidth:1,borderColor:'white',textAlign: 'center',marginHorizontal:25,padding:15,flexDirection:'row',marginTop:50,borderRadius:10}}>
        <Text
            style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: Colors.secondary,
            }}>
            {language?.SelectYourSpeciesDetails}
        </Text>
        <SimpleLineIcons name="arrow-down" color={'white'} size={20} style={{fontWeight:'700'}} />
      </TouchableOpacity>
    {selectDetailSpecies == true ?
        <View style={{marginHorizontal: '10%', marginTop: '5%'}}>
        <CheckBoxWithLable status={true} lable={'Avicultura'} />
        <CheckBoxWithLable status={true} lable={'Swine'} />
        <CheckBoxWithLable status={true} lable={'Ruminant'} />
        <CheckBoxWithLable status={true} lable={'Avicultura'} />
        </View>
    : 
    null
    }
      
      <CommonButton
        green={true}
        onPress={() => navigation.navigate('SelectInterest')}
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
