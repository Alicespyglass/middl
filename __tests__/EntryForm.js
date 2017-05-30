import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { View } from 'react-native';
import EntryForm from '../src/components/EntryForm';
import { Card, CardSection, Input } from '../src/components/common';
import renderer from 'react-test-renderer';

describe('<EntryForm />', () => {
  it('renders one Card component', () => {
    const wrapper = shallow(<EntryForm />);
      expect(wrapper.find(Card).length).toBe(1);
  });

  it('renders five CardSection component', () => {
    const wrapper = shallow(<EntryForm />);
      expect(wrapper.find(CardSection).length).toBe(5);
  });

  it('renders two Input component', () => {
    const wrapper = shallow(<EntryForm />);
      expect(wrapper.find(Input).length).toBe(2);
  });
});

it('renders correctly', () => {
  sinon.stub(Math, 'random').returns(0.2);
  const tree = renderer.create(
    <EntryForm />).toJSON();
    expect(tree).toMatchSnapshot();
});
