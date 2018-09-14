import React from 'react';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native';
import firebase from 'react-native-firebase';

import LoggedOut from '@components/logged-out'

import LoggedIn from '@components/logged-in'

const userData = firebase
  .auth()
  .currentUser

class Auth extends React.Component {

  state = {
    loading: true,
    user: {}
  }

  componentDidMount() {
    this.authSubscription = firebase
      .auth()
      .onAuthStateChanged((user) => {
        this.setState({loading: false, user})
      })
    console.log(userData)
  }

  componentWillUnmount() {
    this.authSubscription();
    console.log(userData)
  }

  render() {
    // app is  initialising
    if (this.state.loading) 
      return (
        <SafeAreaView styles={{
          flex: 1
        }}>
          <Text>
            Starting up...
          </Text>
        </SafeAreaView>
      );
    
    // the user is an object, so they are logged in
    if (this.state.user) 
      return (<LoggedIn styles={{
        flex: 1
      }}/>)

      // the user is null
    return (
      <View
        styles={{
        flex: 1,
        height: 500,
        backgroundColor: 'red'
      }}>
        <LoggedOut styles={{
          minHeight: '100%',
          flex: 1
        }}/>
      </View>

    )
  }
}

export default Auth;