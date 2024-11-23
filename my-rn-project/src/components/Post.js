import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from '../firebase/config'
import firebase from "firebase";

export default class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: this.props.posts
        }
    }



handelLike(){

}
handelNotLike(){

}

    render(){
        const {posts} = this.state
        ////en el pate de likes falta el touchableOpacity donde podes likear y deslikear
        return(
            <View>
                <Text>Posteos</Text>
                <Text>Usuario: {posts.data.owner}</Text>
                <Text>Descripcion: {posts.data.text}</Text>
                <Text>Likes: {posts.data.likes}</Text> 
                <Text>Fecha de Publicacion: </Text>
            </View>
        )

    }

}