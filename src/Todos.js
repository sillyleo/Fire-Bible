import React from 'react';
import { SafeAreaView,ScrollView, View, Text, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';

export default class Todos extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
        textInput: '',
    };
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
    console.log(this.state)
  }
  
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>List of TODOs</Text>
        </ScrollView>
        
        <TextInput
          placeholder={'Add TODO'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />

        <Button
          title={'Add TODO'}
          disabled={!this.state.textInput.length}
          onPress={() => {}}
          />
      </SafeAreaView>
    );
  }
}