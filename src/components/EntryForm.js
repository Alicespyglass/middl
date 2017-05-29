import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';

class EntryForm extends Component {
  constructor() {
    super();
    this.state = { personOneLocation: null,
    personTwoLocation: null,
    loading: false
    };
  }

  render() {
    const goToResultsPageCafe = () => {
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation,
      placeType: 'cafe'
      });
    };

    const goToResultsPageBar = () => {
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation,
      placeType: 'bar'
      });
    };

    const goToResultsPageRestaurant = () => {
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation,
      placeType: 'restaurant'
      });
    };

    return (
      <View style={styles.container}>

      <Card>
        <CardSection>
          <Input
            label="You"
            placeholder="Where are you?"
            onChangeText={(personOneLocation) => this.setState({ personOneLocation })}
          />
        </CardSection>

        <CardSection>
            <Input
              label="Them"
              placeholder="Where's your friend?"
              onChangeText={(personTwoLocation) => this.setState({ personTwoLocation })}
            />
        </CardSection>

        <CardSection>
          <Button
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={goToResultsPageCafe}
          >
            Cafe
          </Button>
        </CardSection>

        <CardSection>
          <Button
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={goToResultsPageBar}
          >
            Bar
          </Button>
        </CardSection>

        <CardSection>
          <Button
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={goToResultsPageRestaurant}
          >
            Restaurant
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
