import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { Button } from './common';

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
    console.log(this.state.route)
    return (<View>
      <View>
        <Text>
          {this.state.p1Id}
        </Text>
        <Text>
          {this.state.p2Id}
        </Text>
      </View>
    </View>);
  }
}

export default ResultsPage;
