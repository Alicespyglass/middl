import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    // color: '#007aff',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    // fontFamily: 'Heiti TC',
    fontFamily: 'System'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(150, 41, 146, 0.55)',
    borderRadius: 5,
    borderWidth: 0,
    // borderColor: '#007aff',
    borderColor: 'rgb(0, 0, 0)',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
