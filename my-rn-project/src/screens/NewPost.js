import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from '../firebase/config';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
    }

handleNewPostSubmit() {
    db.collection("posts").add({
        text: this.state.text,
        owner: auth.currentUser.email,
        likes: [],
        createdAt: Date.now()
    }).then(() => {
        this.setState({ text: "" });
        this.props.navigation.navigate("Home")
    }).catch(e => console.log("Error en el posteo: ", e))

}

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Crear un nuevo post</Text>

                <View style={styles.inputsContainer}>
                    <TextInput style={styles.field}
                        placeholder="Ingresa una descripción"
                        onChangeText={text => this.setState({ text: text })}
                        value={this.state.text} />
                </View>

                <TouchableOpacity onPress={() => this.handleNewPostSubmit()} style={styles.button}>
                    <FontAwesome name="plus-square" size={24} color="black" /> <Text style={styles.buttonText}>Subir Nuevo Posteo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffd4a2',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputsContainer: {
        width: '70%',
        marginTop: '10%'
    },
    field: {
        border: "1.5px solid black",
        borderRadius: 6,
        padding: 50,
        marginBottom: 5,
        backgroundColor: 'white',
        textAlign: 'center',
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
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 5
    },
});
