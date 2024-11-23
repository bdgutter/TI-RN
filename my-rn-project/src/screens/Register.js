import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            password: '',
            registered: false,
            error: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("Home")
            }
        })
    }

    register(){
        const { email, userName, password } = this.state;

        if (!email || !userName || !password) {
            this.setState({ messageErr: 'No deben quedar campos sin completar' })
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            return db.collection("users").add({
                email: this.state.email,
                userName: this.state.userName,
                createdAt: Date.now()
            });
        })
        .then(() => {
            this.setState({ registered: true });
            this.props.navigation.navigate("Login")
        })
        .catch((error) => this.setState({ error: "El registro falló", error }))
    }

    render() {
        const { email, userName, password, error } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registrarse</Text>
               <TextInput 
                    style={styles.input}
                    keyboardType = 'email-address'
                    placeholder = 'Email'
                    onChangeText = { text => this.setState({ email: text })}
                    value = {email} 
                />
                <TextInput 
                    style={styles.input}
                    keyboardType = 'default'
                    placeholder = 'UserName'
                    onChangeText = { text => this.setState({ userName: text })}
                    value = {userName} 
                />
                <TextInput 
                    style={styles.input}
                    keyboardType = 'default'
                    placeholder = 'Password'
                    secureTextEntry = {true}
                    onChangeText = { text => this.setState({ password: text })}
                    value = {password} 
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity onPress={()=> this.register()}>
                    <Text style={styles.texto}>Registrarme</Text>
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
        color: 'black',
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
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15
    }
})