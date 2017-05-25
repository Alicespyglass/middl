import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

class ResultsPage extends Component {
  state = {}

  componentWillMount() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
      .then(response => console.log(response));
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
      </View>
    </View>);
  }
}

export default ResultsPage;
