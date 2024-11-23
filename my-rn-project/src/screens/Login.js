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
                this.props.navigation.navigate("HomeMenu")
            }
        })
    };

    handleSubmit() {
        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.setState({ logueado: true, errorMsg: '' })
            })
            .catch(error => {
                this.setState({ errorMsg: 'Error al loguearse: ' + error.message })
            })
    };

    render() {
        return (
            <View style={StyleSheet.container}>

                <Text style={StyleSheet.title}>Login</Text>

                <Text style={StyleSheet.text}>No tengo cuenta:</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={StyleSheet.button}>
                    <Text style={StyleSheet.text}>Registrarme</Text>
                </TouchableOpacity>

                <Text style={StyleSheet.text}>Ya tengo cuenta:</Text>

                <TextInput style={StyleSheet.field}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />

                <TextInput style={StyleSheet.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />

                {/* {this.state.errorMsg ? <Text style={styles.errorMsg}>{this.state.errorMsg}</Text> : null} */}
                {this.state.errorMsg && <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>}

                <TouchableOpacity onPress={() => this.handleSubmit(this.state.email, this.state.password)} style={StyleSheet.button}>
                    <Text style={StyleSheet.text}>Loguearme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeMenu")} style={StyleSheet.button}>
                    <Text style={StyleSheet.text}>Entrar en la app</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

// si no funciona el mensaje de error probar con comentado

export default Login;

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
    },
    text: {
        color: '#fff'
    },
    errorMsg: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    }
});

