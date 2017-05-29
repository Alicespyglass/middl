const PlacesRating = (ratArray) => {
  const ratArrayNoUndefined = ratArray.filter(function(n){ return n.rating !== undefined })
  const sortedArray = ratArrayNoUndefined.sort(function(a,b) {
    return b.rating - a.rating;
  });
  return { ratingsArray: sortedArray };
}

export { PlacesRating };
