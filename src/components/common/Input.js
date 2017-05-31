import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor='rgba(0, 0, 0, 0.3)'
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#222',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 22,
    lineHeight: 23,
    flex: 2,
    fontFamily: 'System',
    // fontFamily: 'Heiti TC'
  },
  labelStyle: {
    color: '#333',
    fontSize: 22,
    paddingLeft: 20,
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'System',
    // fontFamily: 'Heiti TC'
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
};

export { Input };
