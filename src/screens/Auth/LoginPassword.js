import React, {useState,useContext} from 'react';
import { StyleSheet, View, Image, Text, TextInput,TouchableOpacity,ScrollView } from "react-native"
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import WhiteButton from "../../components/Buttons/WhiteButton";
import Input from "../../components/Input/Input";
import CommonButton from "../../components/Buttons/CommonButton";
import { AuthContext } from '../../context/Context';

import { useRoute } from '@react-navigation/native';

const LoginPassword = () => {
    const fetchData = () => {
        
        return fetch(`https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/login-app.php?email=${route.params.email}&password=${pass}`)
              
        .then((response) => response.json())
              .then((data) =>{ 
                console.log(data[0].validation,'Login')
                if(data[0].validation === 'ok'){
                    alert('LoginSuccessfully')
                }
                else{
                    alert(data[0])
                }
          
            //   alert(data[0].validation);
              })
              .catch((err) => {
                console.log(err,'API Failed');
                alert('error')
              });
              
      }



    const route = useRoute();
    console.log(route.params.email,'FromEMAILE=')
 
    const [pass, setPass] = useState('');

import {useForm} from 'react-hook-form';

const LoginPassword = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors, isValid},
      } = useForm({mode: 'all'});
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    return (
        <ScrollView style={styles.mainBox}>
            <Header
                style={{ backgroundColor: 'white', paddingHorizontal: 20 }}
                textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
                backgroundColor={'white'}
                icon={true}
                title={'Login/Registration'}
            />
            <View style={{marginVertical:30}}>


            <Input
                name="password"
                control={control}
                rules={{
                    required: 'Password is required',
                }}
                placeholder={language?.YourPassword}
                  onChangeText={(username) => setPass(username)}
                defaultValue={pass}
                />
                {errors.password && (
                <Text style={styles.errormessage}>* {errors.password.message}</Text>
            )}

                <View style={{marginVertical:30}}>
                    <CommonButton onPress={()=>{fetchData()}}  green={true} title={language?.Next} />
                </View>
            </View>
        </ScrollView>
    )
}

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
    edit: { backgroundColor: Colors.primary, borderWidth: 1, borderRadius: 100, padding: 5 },
    image: { width: 100, height: 100, borderRadius: 100, },
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 },
    input: { backgroundColor: 'white', marginTop: 20, marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 20, borderRadius: 8, fontSize: 16, color: Colors.placeholder }
})


export default LoginPassword;

