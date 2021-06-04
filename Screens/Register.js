import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../Components/Firebase";
import * as ImagePicker from "expo-image-picker";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc="
  );

  const imageUpload = async (image) => {
    const data = new FormData();
    setSubmit(false);
    data.append("file", image);
    data.append("upload_preset", "signal");
    data.append("cloud_name", "abikhan");
    fetch("https://api.cloudinary.com/v1_1/abikhan/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {setImageUrl(data.url);setSubmit(true);console.log('Uri****************',data)})
      .catch((error) => {
        alert(error.message);
        setSubmit(true);
      });
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('Final-----------------------------',imageUrl,authUser)
        authUser.user.updateProfile({
          displayName:name,
          photoURL: imageUrl,
        })
      })
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const data = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      imageUpload(data);
    }
  };

  return (
    <View style={styles.conatiner}>
      <Input
        placeholder="name"
        onChangeText={(val) => setName(val)}
        value={name}
      />
      <Input
        placeholder="email"
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <Input
        placeholder="Password"
        onChangeText={(val) => setPassword(val)}
        value={password}
        secureTextEntry={true}
      />
      <Button
        containerStyle={{ marginTop: 10 }}
        title="Image"
        onPress={pickImage}
      />
      <Button
        disabled={!name || !email || !password || !submit}
        containerStyle={{ marginTop: 10 }}
        title="Register"
        onPress={register}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    padding: 12,
    flex: 1,
    justifyContent: "center",
  },
});
