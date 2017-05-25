import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { Button } from './common';

class ResultsPage extends Component {
  state = {}

  componentWillMount() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => this.setState({ p1Location: response.data }))
      .then(axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2)
        .then(response => this.setState({ p2Location: response.data })));
  }

  render() {
    return (<View>
      <View>
        <Text>
          {this.props.p1}
        </Text>
        <Text>
          {this.props.p2}
        </Text>
        <Button
        onPress={console.log(this.state.p1Location.results[0].place_id)}
        >
          GO
        </Button>
      </View>
    </View>);
  }
}

export default ResultsPage;
