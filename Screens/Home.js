import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import CustomItem from "../Components/CustomItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../Components/Firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export default function Home({ navigation }) {

  const [chat, setChat] = useState([]);

  useEffect(()=>{
    db.collection('chats').onSnapshot(snapshot=>
      setChat(snapshot.docs.map(docs=>({
        id: docs.id,
        data: docs.data()
      })))
    )
  },[])

   const navigateChat = (id, chatName, photoURL) => {
     navigation.navigate("chat", { id, chatName, photoURL });
   };

  const signOut = () => {
    auth
      .signOut()
      .then(navigation.replace("login"))
      .catch((error) => alert(error));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: { color: "black" },
      headerLeft: () => (
        <View style={{ margin: 20 }}>
          <TouchableOpacity onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 60,
            marginHorizontal: 8
          }}
        >
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("chatScreen")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        {chat.map(({id, data}) => (
          <CustomItem key={id} id={id} photoURL={data.photoURL} chatName={data.chatName} navigateChat={navigateChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
