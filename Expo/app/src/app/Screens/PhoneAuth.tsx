// imports
import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import { FIREBASE_AUTH } from "firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


export default function PhoneAuth() {
    // getting router param
    const { usernameParam } = useLocalSearchParams<{ usernameParam: string }>();

    // state variables for user info
    const [username, setUsername] = useState(usernameParam);
    const [phoneNumber, setPhoneNumber] = useState('test2@gmail.com')
    const [verificationCode, setVerificationCode] = useState('');
    const [displayVerification, setDisplayVerification] = useState(false);

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

    const verifyNumber = (phoneNumber) => {
        setDisplayVerification(true);
        // FIREBASE_AUTH.languageCode = 'it';
        // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        //     'size': 'invisible',
        //     'callback': (response) => {
        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //         onSignInSubmit();
        //     }
        // });

    }
    const resendVerification = (phoneNumber) => {

    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex flex-1 bg-background items-center justify-start">
            <View className="flex h-1/3 w-full items-center justify-end pb-16 gap-3">
            <Text className="text-5xl font-semibold">Phone number</Text>
            <Text className="text-xl font-medium text-text/50">Almost there!</Text>
            </View>

            <View className="flex h-1/3 w-full items-center justify-start">
            <TextInput 
                placeholder="Phone number" 
                onChangeText={(text) => setPhoneNumber(text)} 
                value={phoneNumber} 
                placeholderTextColor={'rgba(6, 3, 31)'} 
                className="bg-text/10 w-11/12 h-16 px-4 my-2 rounded-md border-2 border-text/50"
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
            />
            {
                displayVerification &&
                <TextInput 
                    placeholder="Verification code" 
                    onChangeText={(text) => setVerificationCode(text)} 
                    value={verificationCode} 
                    placeholderTextColor={'rgba(6, 3, 31)'} 
                    className="bg-text/10 w-11/12 h-16 px-4 my-2 rounded-md border-2 border-text/50"
                    returnKeyType="done"
                    onSubmitEditing={dismissKeyboard}
                />
            }
            
            <TouchableOpacity onPress={async () => verifyNumber(phoneNumber)} className="w-11/12 h-14 flex justify-center bg-primary rounded-md items-center mt-4">
                <Text className="text-white text-xl font-medium">Verify</Text>
            </TouchableOpacity>
            {
                displayVerification &&
                <TouchableOpacity onPress={async () => resendVerification(phoneNumber)} className="w-11/12 h-14 flex justify-center bg-background rounded-md items-center mt-4">
                <Text className="text-primary text-xl font-medium">Resend</Text>
            </TouchableOpacity>
            }
            
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}
