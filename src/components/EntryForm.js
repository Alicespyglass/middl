import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
      <Image source={require('../assets/blurryTable.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>

      <Card>
        <CardSection style={styles.cardSection}>
          <Input
            label="You"
            placeholder="Where are you?"
            onChangeText={(personOneLocation) => this.setState({ personOneLocation })}
          />
        </CardSection>

        <CardSection style={styles.cardSection}>
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
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardSection: {
    borderBottomWidth: 1
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
});

export default EntryForm;
