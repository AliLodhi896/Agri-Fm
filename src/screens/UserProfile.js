import React, {useContext, useState} from 'react';
import { StyleSheet, View,Image,Text,ScrollView,TouchableOpacity } from "react-native"
import WhiteButton from '../components/Buttons/WhiteButton';
import SocialModal from "../components/Cards/Modals/SocialModal";
import Header from '../components/Header/Header';
import Colors from "../constant/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();
    const {language, selectedlang, setSelectedlang,UserData,setIsSignin,setUserData} = useContext(AuthContext);
    const data = [
        {
            key: 'Mobile',
            value: UserData?.movil
        },
        {
            key: 'Company',
            value: UserData?.NombreEspresa
        },
        {
            key: 'Job',
            value: UserData?.cargo
        },
        {
            key: 'Activity',
            value: UserData?.actividad
        },
        {
            key: 'Production',
            value: 'Avicultura'
        },
        {
            key: 'Details',
            value: UserData?.Detallesotros
        },
        
    ]
  
    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('userDetails');
            setUserData([])
            setIsSignin(false);
            setSelectedlang('')
        } catch (e) {
          alert(e);
        }
      };

    return (
        <ScrollView style={styles.mainBox}>
            <Header icon={true} />
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../assets/Images/swine.png')} />
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="edit" color={'white'} size={20} />
                </TouchableOpacity>
            </View>
            <Text style={styles.welcome}>{language?.Welcome}</Text>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 10, paddingVertical: 20, marginTop: 20 }}>
                {data.map((item, index) => {
                    return (
                        <Text style={{ fontSize: 12, color: Colors.secondary, paddingTop: 5 }}>{item.key} {item.value ? ':' : ''}  {item.value}</Text>
                    )
                })}
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="edit" color={Colors.button} size={20}  />
                    <Text style={{ color: Colors.secondary, fontWeight: 'bold', paddingLeft: 5 }}>{language?.EditProfile}</Text>
                </TouchableOpacity>
            </View>
            {/* <WhiteButton onPress={()=>navigation.navigate('ChangeProduction')} title={language?.ChangeProducting} /> */}
            <View style={{marginHorizontal:20,justifyContent:'center',marginVertical:30}}>
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../assets/Images/mic.png')} />
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="plus" color={'white'} size={18} />
                </TouchableOpacity>
                <Text style={{color:Colors.secondary,fontSize:12,marginTop:10,textAlign:'center'}}>{language?.CreateChannel}</Text>

            </View>
            <WhiteButton onPress={()=>Logout()} title={'Logout'} />

      </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    edit: { backgroundColor: Colors.primary, borderWidth: 1, borderRadius: 100, padding: 5 },
    image: { width: 100, height: 100, borderRadius: 100, },
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 ,textAlign:'center'}
})


export default UserProfile;




