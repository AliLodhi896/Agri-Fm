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

const UserData = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.mainBox}>
            <Header
                style={{ backgroundColor: 'white', paddingHorizontal: 20 }}
                textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
                backgroundColor={'white'}
                icon={true}
                title={'Registration'}
            />
                <View style={{height:100,marginHorizontal:20,marginTop:30}}>
        <Image style={{ height: '100%', width: '100%' }} source={require('../../assets/Images/second.jpg')} />
    </View>
            <View style={{marginVertical:30}}>
                <Input placeholder ={'Choose your job'} />
                <Input placeholder ={'Choose your activity'} />
                <Input placeholder ={'Choose your language'} />
                <Input placeholder ={'Choose your country'} />


                <View style={{marginVertical:30}}>
                    <CommonButton  green={true} onPress={()=>navigation.navigate('ProfessionalDatas')} title={'Next'} />
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
    edit: { backgroundColor: Colors.primary, borderWidth: 1, borderRadius: 100, padding: 5 },
    image: { width: 100, height: 100, borderRadius: 100, },
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 }
})


export default UserData;

