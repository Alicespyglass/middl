import { whatsappMessage } from '../src/components/methods';

test('that a message is constructed', () => {
  const venue = { name: 'Beatties', vicinity: 'Tates Avenue' }
  expect(whatsappMessage(venue)).toEqual('https://api.whatsapp.com/send?text=Hey! Let\'s meet at Beatties on Tates Avenue')
});
