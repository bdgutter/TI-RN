// import React, { Component } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { auth, db } from '../firebase/config';
// import firebase from "firebase";

// export default class Post extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             posts: this.props.posts,
//             like: this.props.posts.data.likes.includes(auth.currentUser.email),
//             cantidadLikes: this.props.posts.data.likes.length
//         }
//     }

//     componentDidMount(){
//         auth.onAuthStateChanged((user) => { 
//             if (!user) {
//                 this.props.navigation.navigate("Login")
//             }
//         })
//     }

// handleLike(){
//     db.collection("posts")
//         .doc(this.props.posts.id)
//         .update({
//             likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
//         })
//     .then(() => this.setState({
//         like: true,
//         cantidadLikes: this.props.posts.data.likes.length + 1
//     }))
// }
// handleNotLike(){
//     db.collection("posts")
//         .doc(this.props.posts.id)
//         .update({
//             likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
//         })
//     .then(() => this.setState({
//         like: false,
//         cantidadLikes: this.props.posts.data.likes.length - 1
//     }))
// }

//     render(){
//         const {posts, like, cantidadLikes} = this.state
//         const createdAt = new Date(posts.data.createdAt).toLocaleDateString()

//         return(
//             <View>
//                 <Text>Posteos</Text>
//                 <Text>Usuario: {posts.data.owner}</Text>
//                 <Text>Descripcion: {posts.data.text}</Text>
//                 {like ? (
//                     <TouchableOpacity onPress={() => this.handleLike()}>
//                         <Text>Me gusta</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity onPress={() => this.handleNotLike()}>
//                         <Text>No me gusta mas</Text>
//                     </TouchableOpacity>
//                 )}
//                 <Text>Cantidad de Likes: {cantidadLikes}</Text>
//                 <Text>Fecha de Publicacion: {createdAt}</Text> 
//             </View>
//         )
//     }
// }