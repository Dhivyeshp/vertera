import { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const [appReady, setAppReady] = useState(false);
  const fadeAnim = new Animated.Value(1);
  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after fonts are loaded
      SplashScreen.hideAsync();

      // Simulate a delay for the splash screen (e.g., 2 seconds)
      setTimeout(() => {
        setAppReady(true);
      }, 2000);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appReady) {
      // Navigate to the onboarding screen after the app is ready
      router.replace('/initialOnboarding');
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Image source={require('../assets/images/doordash.png')} style={styles.logo} />
      </Animated.View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define your routes here */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        <Stack.Screen name="login" options={{ title: 'Log In' }} />
        <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="initialOnboarding" options={{ title: 'Onboarding' }} />
        <Stack.Screen name="index" options={{ title: 'index' }} />

      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});