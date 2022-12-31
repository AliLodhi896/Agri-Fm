import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../constant/Colors';
import {Checkbox} from 'react-native-paper';

const CheckBoxWithLable = props => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.mainView}>
      <View style={styles.iconView}>
        <Checkbox
          status={props.status ? 'checked' : 'unchecked'}
          // onPress={() => {
          //   setChecked(!checked);
          // }}
          onPress={props.onPress}
        />
      </View>
      <Text style={styles.lable}>{props.lable}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  iconView: {
    backgroundColor: 'white',
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  lable: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.secondary,
  },
});

export default CheckBoxWithLable;
