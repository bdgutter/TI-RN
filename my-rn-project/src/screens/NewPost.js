import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from '../firebase/config';

export default class NewPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: "",
        }
    }


//ver que el usuario este logueado 

handleNewPostSubmit(){
    db.collection("posts").add({
        text: this.state.text,
        owner: auth.currentUser.email,
        likes: []
        //dia
    }).then(
        console.log("se creo un nuevo posteo")
    ).catch(e => console.log(e))
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
