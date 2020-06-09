import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Item, FlatList, TouchableOpacity, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data);
  }

  const call = (person) => {
    let phoneNumber = person.phoneNumbers[0].digits;
    let link = `tel:${phoneNumber}`; // http://......  mailto://....  map://...
    Linking.canOpenURL(link)
      .then((supported) => Linking.openURL(link))
      .catch(console.error)
  }

  useEffect(() => {
    const getPerms = async () => {
      await Contacts.requestPermissionsAsync();
    }
    getPerms();
  }, []);

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={getContacts}>
        <Text>Load Contacts</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={
            ({ item }) =>
              <TouchableOpacity style={styles.person} onPress={() => call(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
          }
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 20,
    textAlign: 'center'
  },
  person: {
    backgroundColor: '#eee',
    padding: 10,
    margin: 5
  },
  list: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%',
  },
});