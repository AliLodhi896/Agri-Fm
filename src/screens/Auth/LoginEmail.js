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
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/Context';
import {useForm} from 'react-hook-form';

const LoginEmail = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors, isValid},
      } = useForm({mode: 'all'});

    const navigation = useNavigation();
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
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                }}
                placeholder={language?.YourEmail}
                />
                {errors.email && (
                <Text style={styles.errormessage}>* {errors.email.message}</Text>
            )}
                <View style={{marginVertical:30}}>
                    <CommonButton  green={true} onPress={()=>navigation.navigate('LoginPassword')} title={language?.Next} />
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
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 }
})


export default LoginEmail;

