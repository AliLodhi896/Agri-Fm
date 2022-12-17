import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Platform,
  } from 'react-native';
  import React from 'react';
  import Colors from '../../constant/Colors';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Entypo from 'react-native-vector-icons/Entypo';

  
  const SearchInput = props => {
    return (
      <SafeAreaView>
        <View style={styles.smallbox}>
        <FontAwesome
            color={Colors.secondary}
            name="search"
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.secondary}
            value={props.value}
            // style={styles.searchInput}
            onChangeText={props.onChangeText}
          />
          <Entypo
            color={Colors.secondary}
            name="cross"
            size={22}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default SearchInput;
  
  const styles = StyleSheet.create({
    smallbox: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 10,
      width: '88%',
      backgroundColor: Colors.lightPurple,
      borderRadius: 50,
      paddingHorizontal:20,
    },
    input: {
      color: Colors.secondary,
      fontSize: 12,
      width: '85%',
      padding: Platform.OS == 'ios' ? 10 : 10,
    },
  });