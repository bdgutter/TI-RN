import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            logueado: false,
            errorMsg: ''
        }
    };

    componentDidMount() {
        console.log("pruebaa")
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.props.navigation.navigate("HomePage")
            }
        })
    };

    handleSubmit() {
        const { email, password } = this.state;

        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.setState({ logueado: true, errorMsg: '' })
            })
            .catch(error => {
                if (!email || !password) {
                    this.setState({ errorMsg: 'Complete todos los campos' })
                } else if (!email.includes("@")) {
                    this.setState({ errorMsg: "Email mal escrito" });
                } else if (password.length < 6) {
                    this.setState({ errorMsg: "La contraseña debe tener mínimo 6 caracteres" })
                } else {
                    this.setState({ errorMsg: "Email o contraseña incorrectos" })
                }
            })
    };

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.title}>Login</Text>

                <View style={styles.inputsContainer}>
                    <TextInput style={styles.field}
                        keyboardType='email-address'
                        placeholder='Email'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email} />

                    <TextInput style={styles.field}
                        keyboardType='default'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password} />
                </View>

                {this.state.errorMsg && <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>}

                <TouchableOpacity onPress={() => this.handleSubmit(this.state.email, this.state.password)} style={styles.button}>
                    <Text style={styles.buttonText}>Loguearme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.button}>
                    <Text style={styles.buttonText}>No tengo cuenta</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffd4a2',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputsContainer: {
        width: '50%',
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
        marginTop: 30
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