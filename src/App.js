import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, TextInput, Alert, Button } from 'react-native';

class App extends React.Component {
  constructor() {
    super();
    this.state = { text: 'Enter text'
      //this is where we will define our state
    };
  }
  render() {
    return (<View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTextStyle}>
            middl
          </Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <View style={styles.selfAddress}>
          <TextInput
            style={styles.selfAddressText}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Text>
            Where are you?
          </Text>
        </View>


        <View style={styles.friendAddress}>
        <TextInput
          style={styles.friendAddressText}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
          <Text>
            Where are they?
          </Text>
        </View>
      </View>

      <View style={styles.button}>
        <Button
          title='GO!'
          color='red'
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={onPressGo}
        />
      </View>
    </View>
    );
  }


}
const onPressGo = () => {
  Alert.alert('Button has been pressed');
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'pink'
  },
  header: {
    flex: 1,
    // paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    backgroundColor: '#F8F8F8'
  },
  inputs: {
    flex: 3,
    paddingTop: 50
  },
  titleWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleTextStyle: {
    fontSize: 20
  },
  selfAddress: {
    flex: 10,
    alignItems: 'center'
  },
  selfAddressText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  friendAddress: {
    flex: 4,
    alignItems: 'center'
  },
  friendAddressText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  submitButton: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  button: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonTextStyle: {
    fontSize: 30
  }
});

export default App;
