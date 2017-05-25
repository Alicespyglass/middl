import { View } from 'react-native';
import React from 'react';
import ResultsPage from '../src/components/ResultsPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<ResultsPage />', () => {
  it('renders three View components', () => {
    const wrapper = shallow(<ResultsPage />);
      expect(wrapper.find(View).length).toBe(5);
  });
});
