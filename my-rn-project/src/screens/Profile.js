import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
import firebase from 'firebase';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
            .onSnapshot((docs) => {
                let user = [];
                docs.forEach((doc) => {
                    user.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                if (user.length > 0) {
                    this.setState({ userName: user[0].data.userName });
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
        const { posts } = this.state

        db.collection('posts')
            .doc(posts.id).delete()
            .then(() => {
                console.log('se eliminó el post')
            })
            .catch((error) => {
                console.log(error)
            });
    };
    // handleDeletePost = () => {
    //     const { posts } = this.state

    //     db.collection('posts')
    //         .doc(posts.id)
    //         .update({ posts: firebase.firestore.FieldValue.arrayRemove(posts.id) })
    //         .then(() => {
    //             const updatedPosts = this.state.posts.filter(post => post.id !== posts.id);
    //             this.setState({ posts: updatedPosts });
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // };

    handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log("Cerraste sesion");
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                console.log(error);
            })
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Perfil de usuario</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoLines1}><FontAwesome name="user" size={20} color="black" /> <Text style={styles.infoText}>Nombre de usuario: {this.state.userName}</Text></View>
                    <View style={styles.infoLines}><Ionicons name="mail" size={20} color="black" /> <Text style={styles.infoText}>Email: {this.state.email}</Text></View>
                    <View style={styles.infoLines}><MaterialCommunityIcons name="image-frame" size={20} color="black" /> <Text style={styles.infoText}>Cantidad de posteos: {this.state.posts.length}</Text></View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
                    <Text style={styles.text}>Cerrar sesión</Text>
                </TouchableOpacity>

                <View style={styles.postContainer1}>
                    {this.state.posts.length === 0 ? (
                        <Text style={styles.postContainer2}>No hay post publicados</Text>
                    ) : (
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.postContainer2}>
                                    <Post posts={item} />

                                    <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleDeletePost(item.id)}>
                                        <FontAwesome6 name="trash" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>

            </View>
        )
    }
}

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffd4a2',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    infoContainer: {
        alignItems: 'baseline',
        padding: 15,
        paddingHorizontal: 30,
        width: '90%',
        backgroundColor: '#ffb662',
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'black'
    },
    infoLines: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3
    },
    infoLines1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 3,
        paddingVertical: 3
    },
    postContainer1: { 
        width: '90%',                
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'black',
        paddingVertical: 25,
        paddingHorizontal: 25,
        backgroundColor: '#ffb662',
        marginTop: 20,
    },
    postContainer2: {
        marginBottom: 20,
        marginHorizontal: 5,
        padding: 15,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignItems: 'center'
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
        margin: 20,
        marginBottom: 40
    },
    deleteButton: {
        padding: 10,
        alignItems: 'center',
        marginTop: 10
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
        fontWeight: 'bold',
        fontFamily: ''
    },
    infoText: {
        fontSize: 16,
        color: 'black',
        marginHorizontal: 20
    },
    errorMsg: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    }
})