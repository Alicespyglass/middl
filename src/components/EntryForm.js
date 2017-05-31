import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, quoteGenerator } from './common';

class EntryForm extends Component {
  constructor() {
    super();
    this.state = quoteGenerator;
  }

  componentWillMount() {
    this.setState({randomQuote: this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]});
  }


  render() {
    const goToResultsPageCafe = () => {
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation,
      placeType: 'Cafe'
      });
    };

    const goToResultsPageBar = () => {
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation,
      placeType: 'Bar'
      });
    };

    const goToResultsPageRestaurant = () => {
    Actions.results({ p1: this.state.personOneLocation,
      p2: this.state.personTwoLocation,
      placeType: 'Restaurant'
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

        <View style={styles.quotesView}>
          <Text style={styles.quotesText}>
            {this.state.randomQuote}
          </Text>
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
    borderBottomWidth: 1,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  },
  quotesView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 60,
  },
  quotesText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Bodoni 72',
    alignSelf: 'center',
    padding: 5
  }
});

export default EntryForm;
