import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';
import renderIf from 'render-if';
import { Card, CardSection, Button } from './common';
import Midpoint from './Midpoint';

class ResultsPage extends Component {
  state = {}

  componentWillMount() {
    // Google Geocode API to get user address lat, lng, id => object
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => {
        this.setState({ p1Latitude: response.data.results['0'].geometry.location.lat,
                        p1Longitude: response.data.results['0'].geometry.location.lng,
                        p1Id: response.data.results["0"].place_id
                      });
      })
    // Google Geocode API to get friend address lat, lng, id => object
    .then(response => axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2)
      .then(response => {
        this.setState({ p2Latitude: response.data.results['0'].geometry.location.lat,
                        p2Longitude: response.data.results['0'].geometry.location.lng,
                        p2Id: response.data.results["0"].place_id
                      });
      })
    )
    // Calculate midpoint between user and friend => [lat, lng]
    .then(response => { Midpoint.midpoint(this.state.p1Latitude, this.state.p1Longitude, this.state.p2Latitude, this.state.p2Longitude) })

    // Google Places API to find places within 500m radius of midPoint => array
    .then(response => axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.lat2 + ',' + this.state.lng2 + '&radius=500&key=AIzaSyByFVMWrXcFmDawtZV1tqvn0fAXgVZe-DY' + '&types=' + this.props.placeType)
      .then(response => {
        this.setState({ midPlaces: response.data,
                        midPlaceOneId: response.data.results["0"].place_id
                      });
      })
    )
    // Pull ratings from places
    .then(response => { this.placesRatingsArray() })
    .then(response => { this.top3RatedArray() })
    .then(response => {
      this.setState({ name1: this.state.top3venues[0].name,
                      address1: this.state.top3venues[0].vicinity,
                      place1lat: this.state.top3venues[0].geometry.location.lat,
                      place1lng: this.state.top3venues[0].geometry.location.lng,
                      name2: this.state.top3venues[1].name,
                      address2: this.state.top3venues[1].vicinity,
                      place2lat: this.state.top3venues[1].geometry.location.lat,
                      place2lng: this.state.top3venues[1].geometry.location.lng,
                      name3: this.state.top3venues[2].name,
                      address3: this.state.top3venues[2].vicinity,
                      place3lat: this.state.top3venues[2].geometry.location.lat,
                      place3lng: this.state.top3venues[2].geometry.location.lng
                    });
    })
  }

  // midpoint(lat1, lng1, lat2, lng2) {
  //   const rad = (Math.PI) / 180;
  //   const rlat1 = lat1 * rad;
  //   const rlng1 = lng1 * rad;
  //   const rlat2 = lat2 * rad;
  //   const rlng2 = lng2 * rad;
  //
  //   const dlng = rlng2 - rlng1;
  //   const Bx = Math.cos(rlat2) * Math.cos(dlng);
  //   const By = Math.cos(rlat2) * Math.sin(dlng);
  //
  //   const lat3 = Math.atan2(Math.sin(rlat1) + Math.sin(rlat2),
  //             Math.sqrt(((Math.cos(rlat1) + Bx) * (Math.cos(rlat1) + Bx)) + (By * By)));
  //   const lng3 = rlng1 + Math.atan2(By, (Math.cos(rlat1) + Bx));
  //
  //   const lat = (lat3 * 180) / Math.PI;
  //   const lng = (lng3 * 180) / Math.PI;
  //   this.setState({ lat2: lat, lng2: lng });
  // }


  placesRatingsArray() {
    const ratArray = this.state.midPlaces.results;
    const ratArrayNoUndefined = ratArray.filter(function(n){ return n.rating !== undefined })
    const sortedArray = ratArrayNoUndefined.sort(function(a,b) {
      return b.rating - a.rating;
    });
    this.setState({ ratingsArray: sortedArray });
  }

  top3RatedArray() {
    const topvenues = this.state.ratingsArray.slice(0, 3);
    this.setState({ top3venues: topvenues });
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
          value: 'r'
        }
      ]
    };

    getDirections(data);
  }

  whatsapp() {
    const endPoint =
    'https://api.whatsapp.com/send?text=' + 'Hey! Lets meet at ' + this.state.top3venues[0].name + ' on ' + this.state.top3venues[0].vicinity + '. 😘'
    return endPoint
  }

  render() {
    console.log("p1 Latitude: ", Object.prototype.toString.call(this.state.p1Latitude))

    return (<View style={styles.container}>
      {renderIf(this.state.name1)(
        <Card>
        <CardSection>
          <Text>
            {this.state.name1}
          </Text>
        </CardSection>
        <CardSection>
          <Text>
            {this.props.placeType.replace(/\b\w/g, function(l) { return l.toUpperCase(); })}
          </Text>
        </CardSection>
        <CardSection>
          <Text>
            {this.state.address1}
          </Text>
        </CardSection>
        <CardSection>
          <Button
          onPress={() =>
            this.handleGetDirections(this.state.p1Latitude,
                                    this.state.p1Longitude,
                                    this.state.place1lat,
                                    this.state.place1lng)}
          >
            Get Directions
          </Button>

          <Button
            onPress={() =>
              Linking.openURL('https://api.whatsapp.com/send?text=' + 'Hey! Lets meet at ' + this.state.top3venues[0].name + ' on ' + this.state.top3venues[0].vicinity + '. 😘')}
          >
          Message friend
          </Button>
        </CardSection>
        </Card>
      )}


      {renderIf(this.state.name2)(
        <Card>
          <CardSection>
            <Text>
              {this.state.name2}
            </Text>
          </CardSection>
          <CardSection>
            <Text>
              {this.props.placeType.replace(/\b\w/g, function(l) { return l.toUpperCase(); })}
            </Text>
          </CardSection><CardSection>
            <Text>
              {this.state.address2}
            </Text>
          </CardSection>

          <CardSection>
            <Button
            onPress={() =>
              this.handleGetDirections(this.state.p1Latitude,
                                      this.state.p1Longitude,
                                      this.state.place2lat,
                                      this.state.place2lng)}
            >
              Get Directions
            </Button>
            <Button
              onPress={() =>
                Linking.openURL('https://api.whatsapp.com/send?text=' + 'Hey! Lets meet at ' + this.state.top3venues[1].name + ' on ' + this.state.top3venues[1].vicinity + '. 😘')}
            >
            Message friend
            </Button>
          </CardSection>
        </Card>
      )}

      {renderIf(this.state.name3)(
        <Card>
          <CardSection>
            <Text>
              {this.state.name3}
            </Text>
          </CardSection>
          <CardSection>
            <Text>
              {this.props.placeType.replace(/\b\w/g, function(l) { return l.toUpperCase(); })}
            </Text>
          </CardSection>
          <CardSection>
            <Text>
              {this.state.address3}
            </Text>
          </CardSection>


          <CardSection>
            <Button
            onPress={() =>
              this.handleGetDirections(this.state.p1Latitude,
                                      this.state.p1Longitude,
                                      this.state.place3lat,
                                      this.state.place3lng)}
            >
              Get Directions
            </Button>

            <Button
              onPress={() =>
                Linking.openURL('https://api.whatsapp.com/send?text=' + 'Hey! Lets meet at ' + this.state.top3venues[2].name + ' on ' + this.state.top3venues[2].vicinity + '. 😘')}
            >
            Message friend
            </Button>
          </CardSection>
        </Card>
      )}

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
});

export default ResultsPage;
