import { midpoint } from '../src/components/methods';

test('midpoint produces 2 numbers, lat2 and lng2', () => {
  const expected = {
    lat2: 2.0003044085023727,
    lng2: 2.999390393801055 };
    expect(midpoint(1, 2, 3, 4)).toEqual(expected);
  });
