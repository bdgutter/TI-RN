import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from '../firebase/config'
import firebase from "firebase";

export default class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: this.props.posts,
            like: false,
            cantidadLikes: this.props.item.data.likes.length
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => { 
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
        if(this.props.item.data.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }



handelLike(){
    db.collection("posts").doc(this.props.item.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(this.props.item.data.owner)
    })
    .then(() => this.setState({
        like: true,
        cantidadLikes: this.props.item.data.likes.length
    }))
}
handelNotLike(){
    db.collection("posts").doc(this.props.item.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(this.props.item.data.owner)
    })
    .then(() => this.setState({
        like: false,
        cantidadLikes: this.props.item.data.likes.length
    }))
}

    render(){
        const {posts} = this.state
        const createdAt = new Date(posts.createdAt).toLocaleDateString()

        return(
            <View>
                <Text>Posteos</Text>
                <Text>Usuario: {posts.data.owner}</Text>
                <Text>Descripcion: {posts.data.text}</Text>
                {this.state.like ? (
                    <TouchableOpacity onPress={() => this.handelLike()}>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => this.handelNotLike()}>
                        <Text>No me gusta mas</Text>
                    </TouchableOpacity>
                )}
                <Text>Cantidad de Likes: {this.state.cantidadLikes}</Text>
                <Text>Fecha de Publicacion: {createdAt}</Text>
            </View>
        )

    }

}