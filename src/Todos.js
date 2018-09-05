import React from 'react';
import { SafeAreaView, ScrollView, View, Text, FlatList, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';
import Todo from './Todo';


class Todos extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
      textInput: '',
      loading: true,
      todos: [],
    };
  }

  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }
  
  componentWillMount() {
    // this.unsubscribe();
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    
    querySnapshot.forEach((doc) => {
      const { title, complete } = doc.data();
      
      todos.push({
        key: doc.id,
        doc,
        title,
        complete,
      });
      
      this.setState({
        todos,
        loading: false
      });
      
      
    });
  }
  
  updateTextInput(value) {
    this.setState({ textInput: value });
  }
  
  addTodo() {
    this.ref.add({
      title: this.state.textInput,
      complete: false
    });
    
    this.setState({
      textInput: '',
    });
    
    alert('Sent');
  }

  

  render () {

    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <Todo {...item} />}
        />

        <TextInput
          placeholder="add here"
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <Button
          title="Add New"
          disabled={!this.state.textInput.length}
          onPress={() => this.addTodo()}
        />
      </SafeAreaView>
    );
  }
}

export default Todos;
