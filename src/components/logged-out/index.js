import React, {Component} from 'react';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native'
import firebase from 'react-native-firebase';

class LoggedOut extends Component {

  // state
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    user: {}
  };

  renderLoading() {
    if (this.state.loading) {
      return (
        <Text>Loading</Text>
      )
    }
    return null
  }

  onLogin = () => {
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onRegister = () => {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Log In</Text >
        <TextInput
          placeholder="email"
          value={this.state.email}
          placeholderTextColor="green"
          onChangeText={text => this.setState({email: text})}/>

        <TextInput
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          placeholderTextColor="red"
          onChangeText=
          { text => this.setState({password: text}) }/>

        <Button title="Login" onPress={this
          .onLogin
          .bind(this)}/>

        <Button
          title="Register"
          onPress={this
          .onRegister
          .bind(this)}/>

        <View>
          {this.renderLoading()}
        </View>

      </SafeAreaView>
    );
  }
}

export default LoggedOut;