const setTopVenues = (top3venues) => {
  const venueResult =
  {
                  name1: top3venues[0].name,
                  address1: top3venues[0].vicinity,
                  place1lat: top3venues[0].geometry.location.lat,
                  place1lng: top3venues[0].geometry.location.lng,
                  name2: top3venues[1].name,
                  address2: top3venues[1].vicinity,
                  place2lat: top3venues[1].geometry.location.lat,
                  place2lng: top3venues[1].geometry.location.lng,
                  name3: top3venues[2].name,
                  address3: top3venues[2].vicinity,
                  place3lat: top3venues[2].geometry.location.lat,
                  place3lng: top3venues[2].geometry.location.lng
                };
  return venueResult;
};

export { setTopVenues };
