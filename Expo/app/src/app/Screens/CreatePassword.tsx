// imports
import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

export default function CreatePassword() {
    // getting router param
    const { usernameParam } = useLocalSearchParams<{ usernameParam: string }>();

    // state variables for user info
    const [username, setUsername] = useState(usernameParam);
    const [password, setPassword] = useState('');
    const [savePassword, setSavePassword] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);

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

    // makes sure password is at least 7 characters long and includes a special character
    const checkPasswordValid = (password) => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>[\]\\/'`~;=_+\-]/g;
        return password.length >= 7 && specialCharRegex.test(password);
    };

    const createPassword = (password) => {
        const isValid = checkPasswordValid(password);
        setPasswordValid(isValid);

        if (isValid) {
            // Perform your password creation logic here
            console.log("Password is valid. Proceeding with creation...");
        } else {
            console.log("Password is invalid.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View className="flex flex-1 bg-background items-center justify-start">
                <View className="flex h-1/3 w-full items-center justify-end pb-16 gap-3">
                    <Text className="text-5xl font-semibold">Create password</Text>
                    <Text className="text-xl font-medium text-text/50">Make sure to remember it!</Text>
                </View>

                <View className="flex h-1/3 w-full items-center justify-start">
                    <TextInput
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholderTextColor={'rgba(194, 71, 71)'}
                        className={`w-11/12 h-16 px-4 my-2 rounded-md border-2 ${passwordValid ? 'bg-text/10 border-text/50' : 'bg-error/10 border-error/50 text-error'}`}
                        returnKeyType="done"
                        onSubmitEditing={dismissKeyboard}
                        secureTextEntry={true}
                    />
                    {!passwordValid && (
                        <Text className="text-md font-medium text-error text-start">
                            Password must be 7 characters and include a special character
                        </Text>
                    )}
                    <TouchableOpacity onPress={() => setSavePassword(!savePassword)} className="flex flex-row w-11/12 justify-start items-center gap-1 ml-1 my-2">
                        <Checkbox
                            value={savePassword}
                            onValueChange={setSavePassword}
                            color={savePassword ? '#5147c2' : undefined}
                        />
                        <Text className="text-md font-medium text-text"> Save Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => createPassword(password)} className="w-11/12 h-14 flex justify-center bg-primary rounded-md items-center mt-4">
                        <Text className="text-white text-xl font-medium">Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
