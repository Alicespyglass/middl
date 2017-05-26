import React, { Component } from 'react';
import { Text, View, StyleSheet, WebView } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

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




  render() {
      // console.log(this.state.route.routes.overview_polyline.points);


    return (<View style={styles.container}>


      <View style={styles.mapContainer}>
        <WebView
          source={{uri: 'https://www.google.co.uk/maps/dir/Makers+Academy,+Commercial+Street,+London/Barrio+Shoreditch,+Shoreditch+High+Street,+London/Old+St,+London/@51.5217865,-0.0851688,16z/data=!3m1!4b1!4m20!4m19!1m5!1m1!1s0x48761caf26599a83:0x9b451d586c649129!2m2!1d-0.0732808!2d51.5173403!1m5!1m1!1s0x48761cba7392d025:0xba621056c1feaa8!2m2!1d-0.0781236!2d51.5259171!1m5!1m1!1s0x48761ca8abba80d9:0xd6cf02f1c545d61e!2m2!1d-0.0882806!2d51.5255374!3e2'}}
          // style={{marginTop: 20}}
        />
      </View>

      <Text style={styles.textContainer}>
        Go to Old Street
      </Text>

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
