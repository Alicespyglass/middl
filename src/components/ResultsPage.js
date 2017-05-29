import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';
import renderIf from 'render-if';
import { Card, CardSection, Button } from './common';

class ResultsPage extends Component {
  state = {}

  componentWillMount() {
    // Google Geocode API to get user address lat, lng, id => object
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => {
        this.setState({ p1Location: response.data });
        this.setState({ p1Latitude: response.data.results['0'].geometry.location.lat });
        this.setState({ p1Longitude: response.data.results['0'].geometry.location.lng });
        this.setState({ p1Id: response.data.results["0"].place_id })
      })
    // Google Geocode API to get friend address lat, lng, id => object
    .then(response => axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2)
      .then(response => {
        this.setState({ p2Location: response.data });
        this.setState({ p2Latitude: response.data.results['0'].geometry.location.lat });
        this.setState({ p2Longitude: response.data.results['0'].geometry.location.lng });
        this.setState({ p2Id: response.data.results["0"].place_id });
      })
    )
    // Google Directions API to get route from user to friend => object
    .then(response => axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:' + this.state.p1Id + '&destination=place_id:' + this.state.p2Id + '&key=AIzaSyDWck9QLMxciHSmTpLCjeohqFLksN6qZHU')
      .then(response => this.setState({ route: response.data }))
    )
    // Calculate midpoint between user and friend => [lat, lng]
    .then(response => { this.midpoint(this.state.p1Latitude, this.state.p1Longitude, this.state.p2Latitude, this.state.p2Longitude) })

    // Google Places API to find places (coffee) within 500m radius of midPoint => array
    .then(response => axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.lat2 + ',' + this.state.lng2 + '&radius=500&type=coffee&key=AIzaSyByFVMWrXcFmDawtZV1tqvn0fAXgVZe-DY' + '&types=' + this.props.placeType)
      .then(response => {
        this.setState({ midPlaces: response.data });
        this.setState({ midPlaceOneId: response.data.results["0"].place_id });
      })
    )

    // Pull ratings from places
    .then(response => { this.placesRatingsArray() })
    .then(response => { this.top3RatedArray() })
    .then(response => {
      this.setState({ name1: this.state.top3venues[0].name });
      this.setState({ address1: this.state.top3venues[0].vicinity });
      this.setState({ place1lat: this.state.top3venues[0].geometry.location.lat });
      this.setState({ place1lng: this.state.top3venues[0].geometry.location.lng });
      this.setState({ name2: this.state.top3venues[1].name });
      this.setState({ address2: this.state.top3venues[1].vicinity });
      this.setState({ place2lat: this.state.top3venues[1].geometry.location.lat });
      this.setState({ place2lng: this.state.top3venues[1].geometry.location.lng });
      this.setState({ name3: this.state.top3venues[2].name });
      this.setState({ address3: this.state.top3venues[2].vicinity });
      this.setState({ place3lat: this.state.top3venues[2].geometry.location.lat });
      this.setState({ place3lng: this.state.top3venues[2].geometry.location.lng });
    })


    // .then(response => { this.})

    // Google Directions API to get route from user to place by public transport
    .then(response => axios.get('https://maps.googleapis.com/maps/api/directions/json?&origin=place_id:' + this.state.p1Id + '&destination=place_id:' + this.state.midPlaceOneId + '&mode=transit&key=AIzaSyByFVMWrXcFmDawtZV1tqvn0fAXgVZe-DY')
      .then(response => {
        this.setState({ midPlacesRoute: response.data });
      })
    );
  }

  midpoint(lat1, lng1, lat2, lng2) {
    const rad = (Math.PI) / 180;
    const rlat1 = lat1 * rad;
    const rlng1 = lng1 * rad;
    const rlat2 = lat2 * rad;
    const rlng2 = lng2 * rad;

    const dlng = rlng2 - rlng1;
    const Bx = Math.cos(rlat2) * Math.cos(dlng);
    const By = Math.cos(rlat2) * Math.sin(dlng);

    const lat3 = Math.atan2(Math.sin(rlat1) + Math.sin(rlat2),
              Math.sqrt(((Math.cos(rlat1) + Bx) * (Math.cos(rlat1) + Bx)) + (By * By)));
    const lng3 = rlng1 + Math.atan2(By, (Math.cos(rlat1) + Bx));

    const lat = (lat3 * 180) / Math.PI;
    const lng = (lng3 * 180) / Math.PI;
    this.setState({ lat2: lat, lng2: lng });
  }


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
    console.log('midPlaces[0] route: ', this.state.midPlacesRoute)
    console.log("p1 Latitude: ", Object.prototype.toString.call(this.state.p1Latitude))
    console.log("midlat2: ", Object.prototype.toString.call(this.state.lat2))
    console.log("end to end route: ", this.state.route)
    console.log("P1Lat: ", this.state.p1Latitude)
    console.log("P1Lon: ", this.state.p1Longitude)
    console.log("P2Lat: ", this.state.p2Latitude)
    console.log("P2Lon: ", this.state.p2Longitude)
    console.log("midDeg:", this.state.midDeg)
    console.log("start id:", this.state.p1Id)
    console.log("end id:", this.state.p2Id)
    console.log('midPlaces: ', this.state.midPlaces)
    console.log('midPlaces[0]_id: ', this.state.midPlaceOneId)
    console.log('midPlaces[0] route: ', this.state.midPlacesRoute)
    console.log('places array: ', this.state.ratingsArray)
    console.log('top 3 venues array', this.state.top3venues)
    console.log('place 1 lat', this.props.place1lat)
    console.log('place 2 lng', this.props.place2lng)


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
