import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from '../firebase/config';
import firebase from "firebase";
import AntDesign from '@expo/vector-icons/AntDesign';

export default class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: this.props.posts,
            like: this.props.posts.data.likes.includes(auth.currentUser.email),
            cantidadLikes: this.props.posts.data.likes.length
        }
    }

 
handleLike(){
    db.collection("posts")
        .doc(this.props.posts.id)
        .update({
           likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
    .then(() => this.setState({
        like: true,
        cantidadLikes: this.props.posts.data.likes.length
    }))
}

handleNotLike(){
    db.collection("posts")
      .doc(this.props.posts.id)
      .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
    .then(() => this.setState({
        like: false,
        cantidadLikes: this.props.posts.data.likes.length
    }))
}


    render(){
        const {posts, like, cantidadLikes} = this.state
        const createdAt = new Date(posts.data.createdAt).toLocaleDateString() /////////////////
        
        return(
           <View style={styles.container}>
                <Text style={styles.text}>Usuario: {posts.data ? posts.data.owner : 'Desconocido'}</Text>
                <Text style={styles.text}>Descripción: {posts.data ? posts.data.text : 'Sin descripción'}</Text>
                <Text style={styles.text}>Fecha de publicación: {createdAt}</Text>
            
                <View style={styles.likes}>
                    {like ? (
                        <TouchableOpacity onPress={() => this.handleNotLike()}>
                            <AntDesign name="dislike1" size={18} color="black" />
                        </TouchableOpacity>
                        ) : (
                        <TouchableOpacity onPress={() => this.handleLike()}>
                            <AntDesign name="like1" size={18} color="black" />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.textLikes}>Cantidad de likes: {cantidadLikes}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    postContainer: {
        flex: 1, 
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    likes: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    field: {
        border: "1.5px solid black",
        borderRadius: 6,
        padding: 7,
        marginBottom: 5,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#ffa155',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        padding: 10,
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 40,
        color: '#black',
    },
    text: {
        color: 'black',
        marginBottom: 8, 
        fontSize: 16,
        flexWrap: 'wrap'
    },
    textLikes: {
        color: 'black',
        marginBottom: 8, 
        marginLeft: 5,
        fontSize: 16,
        flexWrap: 'wrap'
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    errorMsg: {
        color: 'red',
        fontSize: 14,
        margin: 10,
        textAlign: 'center',
    }
});
