import React from 'react';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native';
import firebase from 'react-native-firebase';

import LoggedOut from '@components/logged-out'

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
    console.log(this.state.user)
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    // app is  initialising
    if (this.state.loading) 
      return (
        <SafeAreaView>
          <Text>
            Loading.....
          </Text>
        </SafeAreaView>
      );
    
    // the user is an object, so they are logged in
    if (this.state.user) 
      return (
        <SafeAreaView>
          <Text>Logged In!!!!</Text>
          <Button title="Log Out"/>
        </SafeAreaView>
      )

      // the user is null
    return (<LoggedOut/>)
  }
}

export default Auth;