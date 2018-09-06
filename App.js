import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';
import Todos from './src/Todos';
import Auth from './src/Auth';

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (<Auth/>);
  }
}
