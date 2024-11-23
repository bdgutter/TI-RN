import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            userName: "",
            password: ""
        }
    }

    handleSubmit(){
        console.log("email: ", this.state.email)
        console.log("userName: ", this.state.userName)
        console.log("password: ", this.state.password)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Register</Text>
               <TextInput 
                    style={styles.input}
                    keyboardType = 'email-address'
                    placeholder = 'Email'
                    onChangeText = { text => this.setState({email:text})}
                    value = {this.state.email} 
                />
                <TextInput 
                    style={styles.input}
                    keyboardType = 'defualt'
                    placeholder = 'UserName'
                    onChangeText = { text => this.setState({userName:text})}
                    value = {this.state.userName} 
                />
                <TextInput 
                    style={styles.input}
                    keyboardType = 'default'
                    placeholder = 'Password'
                    secureTextEntry = {true}
                    onChangeText = { text => this.setState({password:text})}
                    value = {this.state.password} 
                />

                <TouchableOpacity onPress={()=> this.handleSubmit()}>
                    <Text style={styles.texto}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")} style={styles.button}>
                    <Text style={styles.texto}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#dfdfdf',
        margin: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#black',
    },
    input: {
        border: "1px solid black",
        borderRadius: 6,
        padding: 7,
        marginBottom: 5
    },
    button: {
        backgroundColor: '#989898',
        borderRadius: 5,
        padding: 10,
        width: "100%",
        alignItems: 'center',
        marginTop: 10
    },
    texto: {
        color: 'black'
    }
})