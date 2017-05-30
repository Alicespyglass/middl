import getDirections from 'react-native-google-maps-directions';

const handleGetDirections = (lat1, lng1, lat2, lng2) => {
  const data = {
    source: {
      latitude: lat1,
      longitude: lng1
    },
    destination: {
      latitude: lat2,
      longitude: lng2
    },
    params: [{
      key: 'dirflg',
      value: 'r'
    }]
  };

  getDirections(data);
}

export { handleGetDirections };
