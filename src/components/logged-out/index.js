import React, {Component} from 'react';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native'
import Todos from '../../Todos';

import LogInForm from '@components/log-in-form'

class LoggedOut extends Component {

  render() {
    return (
      <View styles={{
        flex: 1,
        height: "100%"
      }}>
        <LogInForm styles={{
          flex: 1,
          height: 150
        }}/>

      </View>
    );
  }
}

export default LoggedOut;