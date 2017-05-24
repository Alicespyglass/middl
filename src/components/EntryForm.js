import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Button } from './common'

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
    return (
      <View style={styles.container}>
      <Card>
        <CardSection>
          <Input
            label="Your location"
            placeholder="Where are you?"
          />
        </CardSection>

        <CardSection>
            <Input
              label="Their location"
              placeholder="Where is your friend?"
            />
        </CardSection>

        <CardSection>
          <Button
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={Actions.results}
          >
            GO
          </Button>
        </CardSection>
      </Card>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default EntryForm;
