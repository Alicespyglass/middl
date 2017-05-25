import 'react-native';
import React from 'react';
import EntryForm from '../src/components/EntryForm';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <EntryForm />).toJSON();
    expect(tree).toMatchSnapshot();
});
