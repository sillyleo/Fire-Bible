import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import Todo from './Todo';

class Todos extends React.Component {
  constructor() {
    const currentUserId = firebase
      .auth()
      .currentUser
      .uid
    super();
    this.refDoc = firebase
      .firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('todos')
      .doc();

    this.refCollection = firebase
      .firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('todos')

    this.state = {
      textInput: '',
      loading: true,
      todos: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this
      .refCollection
      .onSnapshot(this.onCollectionUpdate)
  }

  componentWillMount() {
    // this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];

    querySnapshot.forEach((doc) => {
      const {title, complete} = doc.data();

      todos.push({key: doc.id, doc, title, complete});

      this.setState({todos, loading: false});

    });
  }

  updateTextInput(value) {
    this.setState({textInput: value});
  }

  addTodo() {

    this
      .refCollection
      .doc()
      .set({title: this.state.textInput, complete: false, priority: "high"})
      .catch((error) => {
        alert(error.message);
      });

    this.setState({textInput: ''});

  }

  render() {

    // if (this.state.loading) {   return null; // or render a loading icon }
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fafafa'
      }}>
        <FlatList
          style={{
          borderTopWidth: 2,
          borderColor: 'black',
          borderBottomWidth: 2,
          flex: 3
        }}
          data={this.state.todos}
          renderItem={({item}) => <Todo {...item}/>}/>

        <TextInput
          style={{
          minHeight: 50,
          backgroundColor: "#999"
        }}
          placeholder="add here"
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}/>
        <Button
          style={{
          minHeight: 50,
          backgroundColor: 'blue'
        }}
          title="Add New"
          disabled={!this.state.textInput.length}
          onPress={() => this.addTodo()}/>
      </View>
    );
  }
}

export default Todos;
