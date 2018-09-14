import React, {Component} from 'react';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native'
import firebase from 'react-native-firebase';

class LogInForm extends Component {

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

    this.setState({error: '', loading: true});

    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log('user is:' + user.uid);
        console.log(user);
        this.setState({user: user})
      })
      .catch((error) => {
        console.log('error here' + error)
        this.setState({error: error.message, loading: false});
      })
  }

  onRegister = () => {

    this.setState({error: '', loading: true});

    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log('user is:' + user.uid);
        console.log(user.uid);
      })
      .catch((error) => {
        console.log('error here' + error)
        this.setState({error: error.message, loading: false});
      });

  }

  render() {
    return (
      <View>
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

        <Text>{this.state.error}</Text>

        <View>
          {this.renderLoading()}
        </View>
      </View>
    );
  }
}

export default LogInForm;