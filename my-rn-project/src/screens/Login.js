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
        auth.onAuthStateChanged((user) => {
            if (user) {
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

                <Text style={styles.text}>No tengo cuenta:</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.button}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Ya tengo cuenta:</Text>

                <View style={styles.inputsContainer}>
                    <TextInput style={styles.field}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email} />

                    <TextInput style={styles.field}
                        keyboardType='default'
                        placeholder='password'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password} />
                </View>

                {this.state.errorMsg && <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>}

                <TouchableOpacity onPress={() => this.handleSubmit(this.state.email, this.state.password)} style={styles.button}>
                    <Text style={styles.buttonText}>Loguearme</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#dfdfdf',
        margin: 20
    },
    inputsContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    field: {
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
    },
    text: {
        color: 'black',
        marginTop: 10
    },
    buttonText: {
        color: 'black'
    },
    errorMsg: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    }
});


