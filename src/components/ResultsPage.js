import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Listing } from './common';
import { midpoint, placesRating, setTopVenues, top3RatedArray } from './methods';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
      this.state = {};
  }

  componentWillMount() {
    // Google Geocode API to get user address lat, lng, id => object
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => {
        this.setState({ userLatitude: response.data.results[0].geometry.location.lat,
                        userLongitude: response.data.results[0].geometry.location.lng,
                        p1Id: response.data.results[0].place_id
                      });
      })
    // Google Geocode API to get friend address lat, lng, id => object
    .then(response => axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2)
      .then(response => {
        this.setState({ p2Latitude: response.data.results[0].geometry.location.lat,
                        p2Longitude: response.data.results[0].geometry.location.lng,
                        p2Id: response.data.results[0].place_id
                      });
      })
    )
    // Calculate midpoint between user and friend => [lat, lng]
    .then(response => { this.setState(midpoint(this.state.userLatitude, this.state.userLongitude, this.state.p2Latitude, this.state.p2Longitude)) })

    // Google Places API to find places within 500m radius of midPoint => array
    .then(response => axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat2},${this.state.lng2}&radius=500&key=AIzaSyByFVMWrXcFmDawtZV1tqvn0fAXgVZe-DY&types=${this.props.placeType}`)
      .then(response => {
        this.setState({ midPlaces: response.data,
                        midPlaceOneId: response.data.results[0].place_id
                      });
      })
    )
    // Pull ratings from places
    .then(response => { this.setState(placesRating(this.state.midPlaces.results)); })
    .then(response => { this.setState(top3RatedArray(this.state.ratingsArray)); })
    .then(response => { this.setState(setTopVenues(this.state.top3venues));
    });
  }

  render() {
    let places = [];
    [1,2,3].forEach(index => {
      places.push([
        this.state[`name${index}`],
        this.state[`address${index}`],
        this.state[`rating${index}`],
        this.props.placeType,
        this.state.userLatitude,
        this.state.userLongitude,
        this.state[`place${index}lat`],
        this.state[`place${index}lng`]])
    });


    return (
      <Image source={require('../assets/blurryLights.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          { places.map( place => Listing(place)) }
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
});

export default ResultsPage;
