import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';

class ResultsPage extends Component {
  render() {
    return (

    <Image source={require('./assets/oldMap.jpg')} style={styles.backgroundImage}>

    <View style={styles.container}>

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
        <Text style={styles.goContainer}>
          Go here
        </Text>

        <Text style={styles.addressContainer}>
          Address
        </Text>
      </View>

    </View>
    </Image>
    )
  }
};

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
    position: 'absolute',
    borderRadius: 20
  },
  textContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  goContainer: {
    flex: 1,
    left: 25,
    right: 25,
    position: 'absolute'
  },
  addressContainer: {
    flex: 3,
    top: 25,
    bottom: 25,
    left: 25,
    right: 25,
    position: 'absolute'
  },
  backgroundImage: {
    flex: 1,
    // alignSelf: 'stretch',
    width: null
  }
})

export default ResultsPage;
