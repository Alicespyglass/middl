import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ResultsPage extends Component {
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
