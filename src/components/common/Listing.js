import React from 'react';
import { Text, Linking, StyleSheet } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { handleGetDirections, whatsappMessage, stars } from '../methods';

const Listing = ([name,
                  address,
                  rating,
                  placeType,
                  userLatitude,
                  userLongitude,
                  place1lat,
                  place1lng]) => {
  return (
    <Card>
      <CardSection style={styles.cardSection}>
        <Text style={styles.venueTitle}>
          {name}
        </Text>
      </CardSection>

      <CardSection style={styles.cardSection}>
        <Text style={styles.venueAddress}>
          {address}
        </Text>
      </CardSection>

      <CardSection style={styles.cardSection}>
        <Text>
          {stars(rating)}
        </Text>
      </CardSection>

      <CardSection style={styles.cardSection}>
        <Text style={styles.venueType}>
          {placeType}
        </Text>
      </CardSection>

      <CardSection style={styles.cardSection}>
        <Button
          onPress={() =>
            handleGetDirections(userLatitude,
              userLongitude,
              place1lat,
              place1lng)}
        >
          Get Directions
        </Button>

        <Button
          onPress={() =>
            Linking.openURL(whatsappMessage(name, address))}
        >
          Message friend
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  venueTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold'
  },
  venueType: {
    color: '#333',
  },
  venueAddress: {
    color: '#333',
    fontStyle: 'italic'
  },
  cardSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
});

export { Listing };
