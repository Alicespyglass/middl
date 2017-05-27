import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import EntryForm from '../src/components/EntryForm';
import { Card, CardSection, Input } from '../src/components/common';
import renderer from 'react-test-renderer';

describe('<EntryForm />', () => {
  it('renders one Card component', () => {
    const wrapper = shallow(<EntryForm />);
      expect(wrapper.find(Card).length).toBe(1);
  });

  it('renders three CardSection component', () => {
    const wrapper = shallow(<EntryForm />);
      expect(wrapper.find(CardSection).length).toBe(3);
  });

  it('renders two Input component', () => {
    const wrapper = shallow(<EntryForm />);
      expect(wrapper.find(Input).length).toBe(2);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(
    <EntryForm />).toJSON();
    expect(tree).toMatchSnapshot();
});
