import React, { Component } from 'react';
import { Text, View, TouchableHighlight, AppRegistry, StyleSheet, TextInput } from 'react-native';

class Middl extends React.Component {
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
          <Text>
            middl
          </Text>
        </View>
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
      </View>

      <View style={styles.footer}>
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
        <TouchableHighlight style={styles.submitButton}
        underlayColor="gray">
          <Text>
            GO!
          </Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'pink'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  titleWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  selfAddress: {
    flex: 10,
    alignItems: 'center'
  },
  selfAddressText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  friendAddress: {
    flex: 4,
    alignItems: 'center'
  },
  friendAddressText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
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
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('middl', () => Middl);
