const setTopVenues = (top3venues) => {
  let venueResult = {};
  [0, 1, 2].forEach(index => {
    venueResult[`name${index + 1}`] = top3venues[index].name;
    venueResult[`address${index + 1}`] = top3venues[index].vicinity;
    venueResult[`place${index + 1}lat`] = top3venues[index].geometry.location.lat;
    venueResult[`place${index + 1}lng`] = top3venues[index].geometry.location.lng;
    venueResult[`rating${index + 1}`] = top3venues[index].rating;
  });
  return venueResult;
};
export { setTopVenues };
