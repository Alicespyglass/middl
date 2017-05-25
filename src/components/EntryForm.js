import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Button } from './common'

import { Actions } from 'react-native-router-flux';

class EntryForm extends Component {
  constructor() {
    super();
    this.state = { personOneLocation: null,
    personTwoLocation: null
    };
  }

  render() {
    const goToResultsPage = () =>
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation });

    return (
      <View style={styles.container}>
      <Card>
        <CardSection>
          <Input
            label="Your location"
            placeholder="Where are you?"
            onChangeText={(personOneLocation) => this.setState({personOneLocation})}
          />
        </CardSection>

        <CardSection>
            <Input
              label="Their location"
              placeholder="Where's your friend?"
              onChangeText={(personTwoLocation) => this.setState({personTwoLocation})}
            />
        </CardSection>

        <CardSection>
          <Button
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={goToResultsPage}
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
