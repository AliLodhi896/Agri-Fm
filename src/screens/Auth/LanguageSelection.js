import React from 'react'
import { View, Text,StyleSheet, TouchableOpacity,Image} from 'react-native'
import Colors from '../../constant/Colors'


const LanguageSelection = () => {
  return (
    <View style={styles.mainBox}>
       <TouchableOpacity style={styles.flagBox}>
       <Image
            source={require('../../assets/Images/spain-flag.png')}
            style={{width: '100%', height: '100%',borderRadius:100}}
        />
       </TouchableOpacity>
       <TouchableOpacity style={styles.flagBox}>
       <Image
            source={require('../../assets/Images/brazil-flag.jpg')}
            style={{width: '100%', height: '100%',borderRadius:100}}
        />
       </TouchableOpacity>
       <TouchableOpacity style={styles.flagBox}>
       <Image
            source={require('../../assets/Images/uk-flag.png')}
            style={{width: '100%', height: '100%',borderRadius:100}}
        />
       </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        backgroundColor:Colors.secondary,
        justifyContent:'center',
        paddingHorizontal:20,
        alignContent:'center',
        alignItems:'center'
    },
    flagBox:{
        borderRadius:100,
        width:100,
        height:100,
        marginTop:10
    }
})

export default LanguageSelection