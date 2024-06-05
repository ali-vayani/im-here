// imports
import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';



export default function CreateUsername() {
  // state variables for user info
  const [username, setUsername] = useState('test2@gmail.com')

  // navigation variables
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  // removes header on load
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // dismisses keyboard when needed
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const createPassword = (username) => {
    router.replace({ pathname: '/Screens/CreatePassword', params: { username: username } });
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex flex-1 bg-background items-center justify-start">
        <View className="flex h-1/3 w-full items-center justify-end pb-16 gap-3">
          <Text className="text-5xl font-semibold">Create username</Text>
          <Text className="text-xl font-medium text-text/50"> You can always change it later!</Text>
        </View>

        <View className="flex h-1/3 w-full items-center justify-start">
          <TextInput 
            placeholder="Username" 
            onChangeText={(text) => setUsername(text)} 
            value={username} 
            placeholderTextColor={'rgba(6, 3, 31)'} 
            className="bg-text/10 w-11/12 h-16 px-4 my-2 rounded-md border-2 border-text/50"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />
          
          <TouchableOpacity onPress={async () => createPassword(username)} className="w-11/12 h-14 flex justify-center bg-primary rounded-md items-center mt-4">
            <Text className="text-white text-xl font-medium">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
