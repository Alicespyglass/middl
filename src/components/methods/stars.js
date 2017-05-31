const stars = (rating) => {
  const roundRating = Math.round(rating);
  const star = '⭐'.repeat(roundRating);
  return star;
};

export { stars };
