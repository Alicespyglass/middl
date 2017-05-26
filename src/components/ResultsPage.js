import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, CardSection, Button } from './common';
import axios from 'axios';
import getDirections from 'react-native-google-maps-directions';

// <MapView.Polyline coordinates={this.state.route} strokeColor={'#55C2DD'} strokeWidth={4}/>
class ResultsPage extends Component {
  state = { p1Location: null }

  componentWillMount() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => this.setState({ p1Location: response.data }))
        .then(response => this.setState({ p1Id: this.state.p1Location.results["0"].place_id }))
      .then(response => axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2)
        .then(response => this.setState({ p2Location: response.data })))
        .then(response => this.setState({ p2Id: this.state.p2Location.results["0"].place_id }))
        .then(response => axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:' + this.state.p1Id + '&destination=place_id:' + this.state.p2Id + '&key=AIzaSyDWck9QLMxciHSmTpLCjeohqFLksN6qZHU')
          .then(response => this.setState({ route: response.data })));
  }

  handleGetDirections() {
    const data = {
       source: {
        latitude: 51.5463,
        longitude: 0.0573
      },
      destination: {
        latitude: 51.5175,
        longitude: 0.0733
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
      // console.log(this.state.route.routes.overview_polyline.points);


    return (<View style={styles.container}>
      <Card>
        <CardSection>
          <Button
          accessibilityLabel='Click this button to find somewhere you and your friend can meet'
          onPress={this.handleGetDirections}
          >
            GO
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
