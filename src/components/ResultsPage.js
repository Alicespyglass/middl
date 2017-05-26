import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';
import { Card, CardSection, Button } from './common';

class ResultsPage extends Component {
  state = {}

  async componentDidMount() {
    const firstRequest = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1);
    const secondRequest = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2);

    this.setState({
      lat1: firstRequest.data.results[0].geometry.location.lat,
      lng1: firstRequest.data.results[0].geometry.location.lng,
      lat2: secondRequest.data.results[0].geometry.location.lat,
      lng2: secondRequest.data.results[0].geometry.location.lng
    });
  }

  handleGetDirections(lat1, lng1, lat2, lng2) {
    const data = {
       source: {
        latitude: lat1,
        longitude: lng1
      },
      destination: {
        latitude: lat2,
        longitude: lng2
      },
      params: [
        {
          key: 'dirflg',
          value: 'w'
        }
      ]
    };

    getDirections(data);
}

  render() {
    return (<View style={styles.container}>
      <Card>
        <CardSection>
          <Button
          onPress={() =>
            this.handleGetDirections(this.state.lat1,
                                    this.state.lng1,
                                    this.state.lat2,
                                    this.state.lng2)}
          >
            Get Directions
          </Button>
        </CardSection>
      </Card>
    </View>);
  }
}

const styles = StyleSheet.create({
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  container: {
    flex: 1
  },
  map: {
    left: 25,
    right: 25,
    top: 25,
    bottom: 25,
    position: 'absolute'
  },
  textContainer: {
    flex: 2
  },
  mapContainer: {
    flex: 6
  }
})

export default ResultsPage;
