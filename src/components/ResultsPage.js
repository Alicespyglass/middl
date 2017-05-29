import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, Image } from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';
import renderIf from 'render-if';
import { Card, CardSection, Button, Midpoint, PlacesRating } from './common';

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
    .then(response => { this.setState(Midpoint(this.state.p1Latitude, this.state.p1Longitude, this.state.p2Latitude, this.state.p2Longitude)) })

    // Google Places API to find places (coffee) within 500m radius of midPoint => array
    .then(response => axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.lat2 + ',' + this.state.lng2 + '&radius=500&type=coffee&key=AIzaSyByFVMWrXcFmDawtZV1tqvn0fAXgVZe-DY' + '&types=' + this.props.placeType)
      .then(response => {
        this.setState({ midPlaces: response.data });
        this.setState({ midPlaceOneId: response.data.results["0"].place_id });
      })
    )

    // Pull ratings from places
    .then(response => { this.setState(PlacesRating(this.state.midPlaces.results)) })
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


    return (
      <Image source={require('../assets/blurryLights.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
      {renderIf(this.state.name1)(
        <Card style={styles.card}>
        <CardSection style={styles.cardSection1}>
          <Text style={styles.venueTitle}>
            {this.state.name1}
          </Text>
        </CardSection>
        <CardSection style={styles.cardSection1}>
          <Text style={styles.venueType}>
            {this.props.placeType.replace(/\b\w/g, function(l) { return l.toUpperCase(); })}
          </Text>
        </CardSection>
        <CardSection style={styles.cardSection1}>
          <Text style={styles.venueAddress}>
            {this.state.address1}
          </Text>
        </CardSection>
        <CardSection style={styles.cardSection1}>
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
              Linking.openURL(`https://api.whatsapp.com/send?text=Hey! Lets meet at ${this.state.top3venues[0].name} on ${this.state.top3venues[0].vicinity} 😘`)}
          >
          Message friend
          </Button>
        </CardSection>
        </Card>
      )}


      {renderIf(this.state.name2)(
        <Card style={styles.card}>
          <CardSection style={styles.cardSection2}>
            <Text style={styles.venueTitle}>
              {this.state.name2}
            </Text>
          </CardSection>
          <CardSection style={styles.cardSection2}>
            <Text style={styles.venueType}>
              {this.props.placeType.replace(/\b\w/g, function(l) { return l.toUpperCase(); })}
            </Text>
          </CardSection>
          <CardSection style={styles.cardSection2}>
            <Text style={styles.venueAddress}>
              {this.state.address2}
            </Text>
          </CardSection>

          <CardSection style={styles.cardSection2}>
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
                Linking.openURL(`https://api.whatsapp.com/send?text=Hey! Lets meet at ${this.state.top3venues[1].name} on ${this.state.top3venues[1].vicinity} 😘`)}
            >
            Message friend
            </Button>
          </CardSection>
        </Card>
      )}

      {renderIf(this.state.name3)(
        <Card style={styles.card}>
          <CardSection style={styles.cardSection3}>
            <Text style={styles.venueTitle}>
              {this.state.name3}
            </Text>
          </CardSection>
          <CardSection style={styles.cardSection3}>
            <Text style={styles.venueType}>
              {this.props.placeType.replace(/\b\w/g, function(l) { return l.toUpperCase(); })}
            </Text>
          </CardSection>
          <CardSection style={styles.cardSection3}>
            <Text style={styles.venueAddress}>
              {this.state.address3}
            </Text>
          </CardSection>


          <CardSection style={styles.cardSection3}>
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
                Linking.openURL(`https://api.whatsapp.com/send?text=Hey! Lets meet at ${this.state.top3venues[2].name} on ${this.state.top3venues[2].vicinity} 😘`)}
            >
            Message friend
            </Button>
          </CardSection>
        </Card>
      )}

    </View>
    </Image>
  );
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
    flex: 1,
    // backgroundColor: '#6A8EAE'
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
  },
  venueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'white'
  },
  venueType: {
    // fontSize: 16
  },
  venueAddress: {
    // fontSize: 16,
    fontStyle: 'italic'
  },
  cardSection1: {
    // backgroundColor: 'rgba(52, 52, 52, 0.1)'
  },
  cardSection2: {
    // backgroundColor: '#8EB8E5'
  },
  cardSection: {
    // backgroundColor: '#437C90'
  },
  card: {
    // backgroundColor: 'rgb(52, 52, 52)'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
});

export default ResultsPage;
