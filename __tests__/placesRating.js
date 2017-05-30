import { placesRating } from '../src/components/methods';

test('placesRating returns an array or items sorted by ratings', () => {
  const inputArray = [
    { object: 1, rating: 1 }, { object: 2, rating: 2 }, { object: 3, rating: 3 }
  ];
  const expectedArray = {
    ratingsArray: [
    { object: 3, rating: 3 }, { object: 2, rating: 2 }, { object: 1, rating: 1 }
  ] };
  expect(placesRating(inputArray)).toEqual(expectedArray);
});
