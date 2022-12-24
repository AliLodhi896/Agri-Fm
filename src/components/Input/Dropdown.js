import React, {forwardRef, useState} from 'react';
import {StyleSheet, View, TextInput, Text, ActivityIndicator} from 'react-native';
import Colors from '../../constant/Colors';
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  DropDownPicker.setListMode('SCROLLVIEW');
  DropDownPicker.setMode('BADGE');
  return (
    <View style={{marginVertical: 10}}>
      <DropDownPicker
        open={open}
        value={props.value}
        items={props.items}
        style={[{borderWidth: 0,backgroundColor: 'white', marginTop: 20, paddingHorizontal: 15, paddingVertical: 20, borderRadius: 8,},props.style]}
        setOpen={setOpen}
        setValue={props.setValue}
        setItems={props.setItems}
        textStyle={{fontSize: 18,color:'grey'}}
        placeholder={props.placeholder}
        dropDownContainerStyle={{
          borderWidth: 0,
          backgroundColor: '#dfdfdf',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        disableLocalSearch={props.disableLocalSearch}
        onChangeSearchText={props.onChangeSearchText}
        loading={props.loading}
        searchable={props.searchable}
        dropDownDirection="TOP"
        multiple={props.multiple}
        min={props.min}
        badgeColors={[Colors.secondaryBlue]}
        max={props.max}
        zIndex={props.zIndex}
        searchContainerStyle={{
          borderBottomColor: "#dfdfdf"
        }}
        searchTextInputStyle={{
          color: "#000",
          borderWidth:0
        }}
        ActivityIndicatorComponent={({color, size}) => (
          <ActivityIndicator color={color} size={size} />
        )}
        searchPlaceholder="Search..."
      />
    </View>
  );
});
const styles = StyleSheet.create({});
export default Dropdown;
