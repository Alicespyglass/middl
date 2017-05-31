const top3RatedArray = (ratingsArray) => {
  const topVenues = ratingsArray.slice(0, 3);
  return { top3venues: topVenues };
};

export { top3RatedArray };
