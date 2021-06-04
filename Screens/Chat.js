import React, { useLayoutEffect, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { db, auth } from "../Components/Firebase";
import * as firebase from "firebase";

export default function Chat({ navigation, route }) {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);
  const sendMsg = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      message: msg,
      photoURL: auth.currentUser.photoURL
    });
    fetchChats();
    setMsg("");
  };
  console.log("-----------", chats);
  useLayoutEffect(() => {
      fetchChats();
    navigation.setOptions({
      title: "Chat",
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            source={{
              uri: route.params.photoURL
            }}
          />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const fetchChats = () => {
    return db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((item) => ({

            id: item.id,
            data: item.data(),
          }))
        );
      });
  };

console.log('Data',chats)

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <ScrollView>
          {chats.map(({ id, data }) =>
            id === auth.currentUser.id ? (
              <View style={styles.sender}>
                <Avatar
                  rounded
                  position="absolute"
                  bottom={-13}
                  right={-4}
                  size={25}
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
              </View>
            ) : (
              <View style={styles.reciever}>
                <Avatar
                  rounded
                  position="absolute"
                  bottom={-13}
                  right={-4}
                  size={25}
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your message"
            value={msg}
            onChangeText={(val) => setMsg(val)}
          />
          <Ionicons onPress={sendMsg} name="send" size={24} color="#2B68E6" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    marginHorizontal: 8,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 60,
    margin: 8,
  },
  container: {
    height: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
  },
  inputField: {
    backgroundColor: "#CECECE",
    padding: 8,
    borderRadius: 30,
    flex: 1,
    marginTop: "auto",
    marginRight: 8,
  },
  sender: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#2B68E6",
    maxWidth: "80%",
    alignSelf: "flex-end",
    margin: 8,
  },
  senderText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  reciever: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ECECEC",
    maxWidth: "80%",
    alignSelf: "flex-start",
    margin: 8,
  },
  recieverText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
