import { Stack } from 'expo-router/stack';
import "../global.css";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5147c2',
        },
        headerTintColor: '#f4f4f4',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="Screens/CreateUsername" options={{}} />
      <Stack.Screen name="Screens/CreatePassword" options={{}} />
    </Stack>
  );
}
