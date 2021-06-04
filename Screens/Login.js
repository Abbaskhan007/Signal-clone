import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {auth} from '../Components/Firebase'
import {Button, Image, Input} from 'react-native-elements'

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("");

    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password)
        .catch(error=>alert(error));
    }

    useEffect(()=>{
        auth.onAuthStateChanged(authUser=>{
            if(authUser){
                navigation.replace('home')
                console.log('Auth User',authUser)
            }
        })
    },[])
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Image
          source={{
            uri: "https://www.citypng.com/public/uploads/preview/-51610315264wabwxzlfgp.png",
          }}
          style={styles.image}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
        />
        <Button containerStyle={styles.button} title="Login" onPress={signIn} />
        <Button containerStyle={styles.button} onPress={()=>navigation.navigate('register')} type='outline' title="Register" />
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200
    },
button: {
    width: 200,
    marginTop: 10
}
})