import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class ResultsPage extends Component {
  render() {
    return (<View style={styles.container}>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>
          Go here
        </Text>
      </View>

    </View>);
  }
}

const styles = StyleSheet.create({
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
})

export default ResultsPage;
