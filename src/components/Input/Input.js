import React, {forwardRef} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Colors from '../../constant/Colors';
import {useController} from 'react-hook-form';

const Input = forwardRef((props, ref) => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });
  return (
    <View style={[{marginVertical: 10, marginHorizontal: 20}, props.style]}>
      <TextInput
        value={field.value}
        ref={ref}
        underlineColorAndroid="transparent"
        multiline={props.multiline}
        style={[styles.text, props.textStyle, styles.input]}
        placeholder={props.placeholder}
        onChangeText={field.onChange}
        placeholderTextColor='grey'
        onSubmitEditing={props.onSubmitEditing}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        numberOfLines={props.numberOfLines}
        autoComplete={props.autoComplete}
        editable={props.editable}
        textAlignVertical={props.textAlignVertical}
      />
    </View>
  );
});
const styles = StyleSheet.create({
    input: { backgroundColor: 'white', marginTop: 20, marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 20, borderRadius: 8, fontSize: 16, color: Colors.placeholder }
,

  text: {
    fontSize: 18,
    color: 'grey',
    paddingHorizontal: 8,
    letterSpacing: -0.575,
  },
});
export default Input;
