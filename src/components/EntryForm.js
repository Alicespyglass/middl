import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class EntryForm extends Component {
  constructor() {
    super();
    this.state = { personOneText: 'Enter your location',
    personTwoText: 'Enter your friend\'s location'
      //this is where we will define our state
    };
  }
  render() {
    return (<View style={styles.container}>

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
          color='blue'
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={Actions.results}
        />
      </View>
    </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  inputs: {
    flex: 3,
    paddingTop: 50
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
    alignItems: 'center'
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

export default EntryForm;
