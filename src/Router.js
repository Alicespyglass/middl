import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import EntryForm from './components/EntryForm';
import ResultsPage from './components/ResultsPage';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
    <Scene key="entry" component={EntryForm} title="middl" />
    <Scene key="results" component={ResultsPage} title="middl" />
    </Router>
  );
};

export default RouterComponent;
