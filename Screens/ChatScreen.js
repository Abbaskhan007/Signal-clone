import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon  from "react-native-vector-icons/FontAwesome";
import {db, auth} from '../Components/Firebase'

export default function ChatScreen({navigation}) {

  const [name, setName] = useState("");
  const addChat = () => {
      db.collection('chats').add({chatName: name,displayName: auth.currentUser.displayName, photoURL: auth.currentUser.photoURL})
      .then(()=>{
        navigation.goBack();
      })
      .catch(error=>alert(error));
  }

 
  return (
    <View style={styles.container}>
      <Input
        onChangeText={(val) => setName(val)}
        value={name}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        placeholder="Enter a Chat Name"
      />
      <Button disabled={!name} onPress={addChat} title="Create New Chat" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 30,
  },
});
