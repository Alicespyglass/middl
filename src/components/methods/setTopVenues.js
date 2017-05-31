const setTopVenues = (top3venues, placeType, userLatitude, userLongitude) => {

  const venueResult = {
    chosenType: placeType,
    userLat: userLatitude,
    userLng: userLongitude,

    name1: top3venues[0].name,
    address1: top3venues[0].vicinity,
    rating1: top3venues[0].rating,
    place1lat: top3venues[0].geometry.location.lat,
    place1lng: top3venues[0].geometry.location.lng,

    name2: top3venues[1].name,
    address2: top3venues[1].vicinity,
    rating2: top3venues[1].rating,
    place2lat: top3venues[1].geometry.location.lat,
    place2lng: top3venues[1].geometry.location.lng,

    name3: top3venues[2].name,
    address3: top3venues[2].vicinity,
    rating3: top3venues[2].rating,
    place3lat: top3venues[2].geometry.location.lat,
    place3lng: top3venues[2].geometry.location.lng
  };

  const placesTest = [
    [venueResult.name1, venueResult.address1, venueResult.rating1, venueResult.userLat],
    [],
    []
  ];

  return { venues3Hash: venueResult };
};

export { setTopVenues };
