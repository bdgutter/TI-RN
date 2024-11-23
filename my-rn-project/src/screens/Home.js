import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { auth, db } from '../firebase/config'
import Post from "../components/Post";

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => { 
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
    }

handleShowPosts = () => {
    this.setState({
        loading: true
    })
    db.collection("posts").onSnapshot(
        docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posts,
                loading: false
            })
        }
    )
}

    render(){
        return(
            <View>
                <Text>Home</Text>

                {!this.state.loading && (
                    <FlatList 
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({ item }) => <Post item={item} /> }
                    />
                )}
            </View>
        )
    }

}

