import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { auth, db } from '../firebase/config'
import Post from "../components/Post";

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
        this.setState({
            loading: true
        })

        db.collection("posts").orderBy("createdAt", "desc").onSnapshot((docs) => {
            let postArray = [];
            docs.forEach((doc) => {
                postArray.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            this.setState({
                posts: postArray,
                loading: false
            })
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <View style={styles.postContainer1}>
                    {!this.state.loading && (
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.postContainer2}>
                                    <Post posts={item} />
                                </View>
                            )}
                        />
                    )}
                </View>
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
        paddingHorizontal: 20,
    },
    postContainer1: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'black',
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#ffb662',
    },
    postContainer2: {
        marginTop: 20,
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
        alignSelf: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 40,
        color: '#black',
    },
})
