import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import Todos from './src/Todos';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }


  render() {
    return (
      <Todos />
    );
  }
}

