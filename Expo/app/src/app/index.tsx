import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";
import { Stack, useNavigation, useRouter, useLocalSearchParams } from 'expo-router';


export default function SignIn() {
  const [username, setUsername] = useState('test@gmail.com')
  const [password, setPassword] = useState('123123')
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const login = async (username, password) => {
    console.log("test")
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, username, password);
  
      //Signed in
      const user = userCredential.user;
      const uid = user.uid;
      router.setParams({ userID: uid });
      console.log("Logged In");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error [${errorCode}]: ${errorMessage}`);
    }
  }
  
  const resetPassword = (username, phoneNumber) => {
  
  }
  const createAccount = () => {
    const uid = params.userID;
    router.replace({ pathname: '/CreateAccount', params: { userID: uid } });
  };
  

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex flex-1 bg-background items-center justify-start">
        <View className="flex h-1/3 w-full items-center justify-end">
          <Text className="text-5xl font-semibold">I'm Here</Text>
        </View>

        <View className="flex h-1/3 w-full items-center justify-center">
          <TextInput 
            placeholder="Phone number or username" 
            onChangeText={(text) => setUsername(text)} 
            value={username} 
            placeholderTextColor={'rgba(6, 3, 31)'} 
            className="bg-text/10 w-11/12 h-16 px-4 my-2 rounded-md border-2 border-text/50"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />
          <TextInput 
            placeholder="Password" 
            onChangeText={(text) => setPassword(text)} 
            value={password} 
            placeholderTextColor={'rgba(6, 3, 31)'} 
            className="bg-text/10 w-11/12 h-16 px-4 my-2 rounded-md border-2 border-text/50"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={() => resetPassword(username, password)}>
            <Text className="text-primary">Forgot Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={async () => login(username, password)} className="w-11/12 h-14 flex justify-center bg-primary rounded-md items-center mt-8">
            <Text className="text-white text-xl font-medium">Login</Text>
          </TouchableOpacity>
        </View>

        <View className="flex h-1/3 w-full justify-end items-center">
          <TouchableOpacity onPress={() => createAccount()} className="flex flex-row gap-1 mb-10">
            <Text>Dont have an account?</Text>
            <Text className="font-medium text-primary">Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
