import React, {useLayoutEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "./Firebase";

export default function CustomItem({id, chatName, navigateChat, photoURL}) {
  const [messages, setMessages] = useState([])
  useLayoutEffect(()=>{
    db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot=>
      setMessages(snapshot.docs.map(doc=>doc.data()))
    )
  },[])
  return (
    <TouchableOpacity
      onPress={() => navigateChat(id, chatName, photoURL)}
      style={styles.container}
    >
      <Avatar
        rounded
        source={{
          uri: photoURL,
        }}
      />
      <View style={styles.textView}>
        <Text style={styles.title}>{chatName}</Text>
        {messages.length > 0 ? (
          <Text
            style={styles.subTitle}
          >{`${messages?.[0]?.displayName}: ${messages?.[0]?.message}`}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: '#fff'
    },
    textView: {
        marginLeft: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 14,
        color: '#7c7c7c'
    }
});
