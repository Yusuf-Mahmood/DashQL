import { Slot } from 'expo-router';
import { AuthProvider } from '@/context/authContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import tw from 'twrnc';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SafeAreaView style={tw`flex-1 bg-[black]`}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
