import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from '../firebase/config';

export default class NewPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: ""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => { 
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
    }

handleNewPostSubmit(){
    db.collection("posts").add({
        text: this.state.text,
        owner: auth.currentUser.email,
        likes: [],
        createdAt: Date.now()
    }).then( () => {
        this.setState({text: ""});
        this.props.navigation.navigate("Home")
    }).catch(e => console.log("Error en el posteo: ", e))
    
}

    render(){
        return(
            <View>
                <Text>Crear un Nuevo Posteo</Text>
                <TextInput 
                placeholder="Ingresa una descripcion"
                onChangeText={text => this.setState({text: text})}
                value={this.state.text} />
                <TouchableOpacity onPress={() => this.handleNewPostSubmit()} >
                    <Text>Subir Nuevo Posteo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
