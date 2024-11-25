import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { db } from "../firebase/config";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      search: '',
    }
  }

  componentDidMount() {
    db.collection('users').onSnapshot(
      docs => {
        let users = []
        docs.forEach(doc => {
          users.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          users: users,
          filteredUsers: users,
        })
      }
    )
  }

  search(value) {
    this.setState({
      search: value,
      filteredUsers: this.state.users.filter(user => user.data.userName.toLowerCase().includes(value.toLowerCase()))
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Búsqueda de usuarios:</Text>

        <TextInput
          style={styles.search}
          placeholder='Buscar usuario'
          keyboardType='default'
          value={this.state.search}
          onChangeText={(text) => this.search(text)}
        />

        {this.state.filteredUsers.length > 0 ? (
          <FlatList
            data={this.state.filteredUsers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <FontAwesome name="user" size={24} color="black" /> <Text style={styles.text}>{item.data.userName}</Text>
              </View>
            )}
          />) : (
          <Text style={styles.noResults}>El usuario buscado no existe</Text>
        )
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd4a2',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 40,
    color: '#black',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  search: {
    border: "1.5px solid black",
    borderRadius: 6,
    padding: 7,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '50%',
    alignSelf: 'center'
  },
  noResults: {
    marginTop: 20,
    fontSize: 15,
    color: 'red',
    textAlign: 'center'
  },
  text: {
    marginHorizontal: 20
  }
})
