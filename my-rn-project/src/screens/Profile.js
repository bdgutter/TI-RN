import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [], 
        }
    };

    componentDidMount() {
        db.collection("posts")
            .where("userEmail", "==", auth.currentUser.email)
            .onSnapshot((docs) => {
                let postArray = [];
                docs.forEach((doc) => {
                    postArray.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                postArray.sort((a, b) => b.data.createdAt - a.data.createdAt);
                this.setState({
                    posts: postArray
                });
            });
    };


  render() {
    return (
      <View>
        
      </View>
    )
  }
}

export default Profile
