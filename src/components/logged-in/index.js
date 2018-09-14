import React, {Component} from 'react';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native'
import firebase from 'react-native-firebase';
import Todos from '../../Todos';

class LoggedIn extends Component {
    // state
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
        user: {}
    };

    // 新增 user 資料庫

    componentWillMount() {
        this.setState({
            user: firebase
                .auth()
                .currentUser
                .uid,
            email: firebase
                .auth()
                .currentUser
                .email
        })
    }

    componentDidMount() {

        const userId = this.state.user
        const userEmail = this.state.email
        firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .update({email: userEmail, uid: userId})
            .catch((error) => {
                console.log(error.message)

                firebase
                    .firestore()
                    .collection('users')
                    .doc(userId)
                    .set({email: userEmail, uid: userId})

            })

    }

    render() {
        return (
            <SafeAreaView
                style={{
                flex: 1,
                height: "100%"
            }}>
                <Text>
                    Hello: {this.state.user}
                </Text>
                <Text>
                    {this.state.email}
                </Text>
                <Button title="Log Out" onPress={() => firebase.auth().signOut()}/>
                <Todos
                    style={{
                    flex: 4,
                    height: "90%"
                }}/>
            </SafeAreaView>
        );
    }
}

export default LoggedIn;