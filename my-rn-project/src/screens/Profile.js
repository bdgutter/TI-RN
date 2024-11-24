import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

export class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: auth.currentUser.email,
            userName: '',
            posts: [],
        }
    };

    componentDidMount() {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(snapshot => {
                if (true) {
                    const userDoc = snapshot.docs[0];
                    const userData = userDoc.data();
                    this.setState({ userName: userData.username });
                }
            });

        db.collection("posts")
            .where("owner", "==", auth.currentUser.email)
            .onSnapshot((docs) => {
                let postArray = [];
                docs.forEach((doc) => {
                    postArray.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                postArray.sort((a, b) => b.data.createdAt - a.data.createdAt);
                this.setState({ posts: postArray });
            });
    };

    handleDeletePost = () => {
        // const { posts } = this.state

        db.collection('posts')
            .doc(id) // .doc(posts.id)
            .delete()
            .then(() => {
                console.log('Post eliminado')
            })
            .catch((error) => {
                console.log(error)
            });
    };

    handleLogout = () => {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch(error => {
                console.log(error)
            });
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Perfil de usuario</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Nombre de usuario: {this.state.userName}</Text>
                    <Text style={styles.infoText}>Email: {this.state.email}</Text>
                    <Text style={styles.infoText}>Cantidad de posteos: {this.state.posts.length}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogout()}>
                    <Text style={styles.text}>Cerrar sesión</Text>
                </TouchableOpacity>

                {this.state.posts.length === 0 ? (
                    <Text style={styles.text}>No hay post publicados</Text>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            <Post
                                posts={item}
                            />,
                            <TouchableOpacity onPress={() => this.handleDeletePost(item.id)} style={styles.button}>
                                <Text style={styles.text}>Eliminar post</Text>
                            </TouchableOpacity>
                        }}
                    />
                )}
                
            </View>
        )
    }
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    infoContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
        color: 'black'
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
      },
    errorMsg: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    }
})
