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

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("HomePage")
            }
        })
    }

    register() {
        const { email, userName, password } = this.state;

        if (!email || !userName || !password) {
            this.setState({ error: 'Complete todos los campos' })
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
            .catch((error) => {
                if (!email.includes("@")) {
                    this.setState({ error: "Email mal escrito" });
                } else if (password.length < 6) {
                    this.setState({ error: "La contraseña debe tener mínimo 6 caracteres" })
                } else {
                    this.setState({ error: "Email o contraseña incorrectos" })
                }
            })
    }

    render() {
        const { email, userName, password, error } = this.state;

        const formOk = email && userName && password;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Username'
                    onChangeText={text => this.setState({ userName: text })}
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={password}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                {formOk ?
                    <TouchableOpacity onPress={() => this.register()} style={styles.button}>
                        <Text style={styles.texto}>Registrarme</Text>
                    </TouchableOpacity>
                    : null}

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.button}>
                    <Text style={styles.texto}>Ya tengo cuenta</Text>
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 40,
        color: '#black',
    },
    input: {
        border: "1.5px solid black",
        borderRadius: 6,
        padding: 7,
        marginBottom: 5,
        backgroundColor: 'white',
        width: '50%'
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
    texto: {
        color: 'black',
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        fontSize: 14,
        margin: 10,
        textAlign: 'center',
    }
})