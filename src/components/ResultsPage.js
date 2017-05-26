import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

class ResultsPage extends Component {
  state = {  p1Id: null, p2Location: null, p2Id: null, route: null, p1lat: 3, p1lng: 2, p2lat: null, p2lng: null }

  componentWillMount() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => {
        this.setState({ p1Location: response.data });
        this.setState({ p1latitude: response.data });
        this.setState({ p1longitude: response.data.results['0'].geometry.location.lng });
      })

      .then(response => this.setState({ p1Id: this.state.p1Location.results['0'].place_id }))

      .then(response => axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2)
        .then(response => this.setState({ p2Location: response.data })))
        .then(response => this.setState({ p2Id: this.state.p2Location.results['0'].place_id }))



        .then(response => axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:' + this.state.p1Id + '&destination=place_id:' + this.state.p2Id + '&key=AIzaSyDWck9QLMxciHSmTpLCjeohqFLksN6qZHU')
          .then(response => this.setState({ route: response.data })))
          .then(response => centrePoint(3, 4));
  }

  render() {
    console.log("location", this.state.p1Location)
    console.log("path", this.state.p1Location.results['0'].geometry.location.lat)
    console.log("p1lat", this.state.p1latitude)
    console.log("p1lng", this.state.p1longitude)

    return (<View style={styles.container}>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }}>
              <View>
                <View style={styles.marker} />
              </View>
            </MapView.Marker>

          </MapView>
      </View>

      <View style={styles.textContainer}>
      </View>

    </View>);
  }
}

const centrePoint = (lng1, lng2) => {
  let midway = (lng1 + lng2) / 2
  console.log(midway)
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
    flex: 1
  },
  mapContainer: {
    flex: 1
  }
});

export default ResultsPage;
