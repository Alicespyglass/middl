import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';

class EntryForm extends Component {
  constructor() {
    super();
    this.state = { personOneLocation: null,
    personTwoLocation: null,
    loading: false,
    quotes: ['“If you’re afraid of butter, use cream.” -Julia Child', '“First we eat, then we do everything else.” -M.F.K. Fisher', '“Life is uncertain. Eat dessert first.” -Ernestine Ulmer', '“In wine there is wisdom, in beer there is strength, in water there is bacteria.” -David Auerbach', '“Wine and cheese are ageless companions, like aspirin and aches, or June and moon, or good people and noble ventures.” -M.F.K. Fisher', '“You don’t need a silver fork to eat good food.” -Paul Prudhomme', '“I have made a lot of mistakes falling in love, and regretted most of them, but never the potatoes that went with them.” -Nora Ephron', '“The only time to eat diet food is while you’re waiting for the steak to cook.” -Julia Child', '“I cook with wine. Sometimes I even add it to the food.” -W.C. Fields', '“We all eat, and it would be a sad waste of opportunity to eat badly.” -Anna Thomas', '“A balanced diet is a cookie in each hand.” -Barbara Johnson', '“People who love to eat are always the best people." -Julia Child', '“My doctor told me I had to stop throwing intimate dinners for four unless there are three other people.” -Orson Welles', '“The secret of success in life is to eat what you like and let the food fight it out inside.” -Mark Twain', '“It’s difficult to think anything but pleasant thoughts while eating a homegrown tomato.” -Lewis Grizzard', '“There is no sincerer love than the love of food.” -George Bernard Shaw', '“One cannot think well, love well, sleep well, if one has not dined well.” -Virginia Woolf', '“If you really want to make a friend, go to someone’s house and eat with him… the people who give you their food give you their heart.” -Cesar Chavez', '“My weaknesses have always been food and men — in that order.” - Dolly Parton', '“If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.” -J.R.R. Tolkien', '“Cooking is like love. It should be entered into with abandon or not at all.” -Harriet van Horne', '“He was a bold man that first ate an oyster.” - Jonathan Swift', '“Food is symbolic of love when words are inadequate.” -Alan D. Wolfelt', '“Vegetables are a must on a diet. I suggest carrot cake, zucchini bread and pumpkin pie.” -Jim Davis', '“All happiness depends on a leisurely breakfast.” -John Gunther']
    };
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
    // fontFamily: 'Heiti TC'
    alignSelf: 'center',
    padding: 5
  }
});

export default EntryForm;
